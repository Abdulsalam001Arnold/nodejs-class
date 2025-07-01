
const Contact = require('../models/contactSchema')
const contactValidator = require('../validators/contactValidator')

const getHome = (request, response) => {
    response.send('Hello guys!!!');
}

const getAbout = (request, response) => {
    response.send('This is the about page');
}

const newContact = async (req, res) => {
    try{
    const { name, email, phoneNumber } = req.body

    const { error } = contactValidator.validate({ name, email, phoneNumber })

    if (error) {
        res.status(400).json({ error: error.details[0].message})
    }
    
    if(name !== "" && email !== ""){
        const contact = await Contact.create({
            name,
            email,
            phoneNumber
        })
        res.status(201).json({message: "Contact created successfully!", contact})
    }else{
        res.status(400).json({message: "Name and email are required!"})
    }
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Internal server error!"})
    }
}

const getContacts = async(req, res) => {
 const contacts = await Contact.find()
 res.status(200).json({contacts})
}

const getSingle = async (req, res) => {
    try{
        const contact = await Contact.findById(req.params.id)
        if(!contact){
            return res.status(404).json({message: "Contact not found!"})
        }
        res.status(200).json({contact})
    }catch(err){
        console.error(err.message)
        res.status(500).json({message: "Internal server error!"})
    }
}

 const deleteSingle = async (req, res) => {
    try{
        const {id} = req.params
        const contact = await Contact.findByIdAndDelete(id)
        if(!contact){
            return res.status(404).json({message: "Contact not found!"})
        }
        res.status(200).json({message: "Contact deleted successfully!"})
    }catch(err){
        console.error(err.message)
        res.status(500).json({message: "Internal server error!"})
    }
}


module.exports = { getHome, getAbout, newContact, getContacts, getSingle, deleteSingle }




  