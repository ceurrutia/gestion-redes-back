import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
    {
        nombreApellido: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            
        },
        cuentax: {
            type: String,
            
        },
        instagram: {
            type: String,
            
        },
        linkedin: {
            type: String,
            
        },
        comentarios: {
            type: String,
            
        },
    },
    {
        timestamps: true
    }
);

export const Account = mongoose.model('Account', accountSchema);