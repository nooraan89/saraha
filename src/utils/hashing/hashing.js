import bcrypt from"bcrypt";
export const hash=({data,saltRound=10})=>{  bcrypt.hashSync(data);
}
export const  compare=({data,hash})=>{ bcrypt.compareSync(data,hash);}