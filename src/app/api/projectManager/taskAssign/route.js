import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import leadLoginModel from "../../models/leadLoginModel";
import LeadTaskModel from "../../models/leadTaskModel";
import moment from 'moment';
import managerLoginModel from "../../models/managerLoginModel";
connect();
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { designation, importance, projectTitle, description, instruction, startDate, endDate, assignedBy ,projectId} = reqBody
        console.log(reqBody, "-------------manager api")
        // saved data to database
        const findTeam = await leadLoginModel.findOne({ designation })
        console.log(findTeam, '----team')
        if (!findTeam) {
            console.log(error, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const findPM = await managerLoginModel.findById(assignedBy);
        if (!findPM) {
            console.log(error, '---error=')
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        const teamLeadId = findTeam._id
        const existTeam = await LeadTaskModel.findOne({ teamLeadId })
        if (existTeam) {
            existTeam.newTasks.push({
                assignedBy: "Project Manager",
                assignedPersonName: `${findPM.firstName} ${findPM.lastName}`,
                importance,
                projectTitle,
                description,
                status: "New Task",
                instruction,
                endDate,
                projectId,
                startDate
            })
            const savedData = await existTeam.save();
            const latestNewTaskId = savedData.newTasks[savedData.newTasks.length - 1]._id;
            // existTeam.notifications.push({
            //     message: `Project Manager ${findPM.firstName} Assigned a New Task`,
            //     projectId: latestNewTaskId,
            // })
            findTeam.notifications.push({
                message: `Project Manager ${findPM.firstName} Assigned a New Task`,
                projectId: latestNewTaskId,
            })
            const saveNotification = await findTeam.save()
            const newData = await existTeam.save();
            console.log(newData, "------newData---------o")
            return NextResponse.json(
                { message: "Assigned task successfully" },
                { success: true },
                // { savedData },
                { status: 200 });
        } else {
            const assignedTask = new LeadTaskModel({
                teamLeadId,
                newTasks: [{
                    assignedBy: "Project Manager",
                    assignedPersonName: `${findPM.firstName} ${findPM.lastName}`,
                    importance,
                    projectTitle,
                    description,
                    status: "New Task",
                    instruction,
                    endDate,
                    projectId,
                    startDate
                }],
            });
            const savedTask = await assignedTask.save();
            const latestNewTaskId = savedTask.newTasks[savedTask.newTasks.length - 1]._id;
            findTeam.notifications.push({
                message: `Project Manager ${findPM.firstName} Assigned New a Task`,
                projectId: latestNewTaskId,
            })
            const saveNotification = await findTeam.save()
            return NextResponse.json(
                { message: "Assigned task successfully" },
                { success: true },
                { savedTask },
                { status: 201 }
            )
        }
    } catch (error) {
        console.log(error, '====.................=====error')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}