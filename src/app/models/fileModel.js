import mongoose from 'mongoose';
const fileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    Files: [
        {
            name: {
                type: String,
                required: true,
            },
            file: {
                data: {
                    type: Buffer,
                    required: true,
                },
                contentType: {
                    type: String,
                    required: true,
                },
            },
            date: Date,
        }
    ],
});
const FileModel = mongoose.models.files || mongoose.model('files', fileSchema);
export default FileModel;