import 'text-encoding-polyfill'
import JOI from "joi";

// JOI est une librairie qui permet d'effectuer plein de test très facilement

export const schemaEtudiant = JOI.object({
    login : JOI.string().min(3).max(30).required() ,
    password : JOI.string().min(3).max(30).required(),
    statut : JOI.string().min(3).max(30).required(),
});