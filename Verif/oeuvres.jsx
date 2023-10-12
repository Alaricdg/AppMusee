import 'text-encoding-polyfill'
import JOI from "joi";

export const schemaOeuvres = JOI.object({
    nom : JOI.string().min(3).max(255).required() ,
    description : JOI.string().min(3).max(10000).required(),
    adresse : JOI.string().min(3).max(400).required() ,
});