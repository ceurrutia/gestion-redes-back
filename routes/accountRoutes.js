import express from 'express'
import { Account } from '../models/AccountModel.js'

const router = express.Router()

//Route for save a new account

router.post('/', async (request, response) => {
    try {
        if (!request.body.nombreApellido) {
            return response.status(400).send({
                message: "El campo 'nombreApellido' es obligatorio.",
            });
        }

        const newAccount = {
            nombreApellido: request.body.nombreApellido,
            descripcion: request.body.descripcion || '',  
            cuentax: request.body.cuentax || '',
            instagram: request.body.instagram || '',
            linkedin: request.body.linkedin || '',
            comentarios: request.body.comentarios || ''
        };

        const account = await Account.create(newAccount);
        return response.status(201).send(account);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get cuentas

router.get('/', async (request, response) => {
    try {
        const { nombreApellido } = request.query; 

        let accounts;

        if (nombreApellido) {
            // Filtrar cuentas con 3 primras letras
            accounts = await Account.find({
                nombreApellido: { $regex: '^' + nombreApellido, $options: 'i' } 
            });
        } else {
            accounts = await Account.find({});
        }

        return response.status(200).send({
            count: accounts.length,
            data: accounts
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//get a account for it ID

router.get('/:id', async (request, response)=> {
    try {

        const { id } = request.params;

        const account = await Account.findById(id)
        
        return response.status(200).json(account)

    } catch (error){
        console.log(error.message)
        response.status(500).send( {message: error.message})
    }

})


//Update an account

router.put('/:id', async (request, response) => {
    try {
        
        if (!request.body.nombreApellido) {
            return response.status(400).send({
                message: "El campo 'nombreApellido' es obligatorio.",
            });
        }

        const { id } = request.params;

        const updatedAccount = await Account.findByIdAndUpdate(
            id, 
            { $set: request.body },  
            { new: true, runValidators: true }  //Usar! Retorna el documento actualizado y valida según shema
        );

        if (!updatedAccount) {
            return response.status(404).json({ message: 'Cuenta no encontrada.' });
        }

        return response.status(200).send(updatedAccount);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//delete an account

router.delete('/:id', async (request, response)=>{
    try {

        const { id } = request.params
        const result = await Account.findByIdAndDelete(id)
        if (!result){
            return response.status(404).json( { message: "Cuenta no encontrada"})
        }

        return response.status(200).send( {message: "Cuenta eliminada exitosamente "})

    } catch (error){
        console.log(error.message)
        response.status(500).send( {message: error.message})
    }
})

export default router;