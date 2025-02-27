module.exports.signUpErrors = (err) => {
    let errors = { nom: "", email: "", password: "" };
  
    if (err.message.includes("nom"))
      errors.nom = "Nom incorrect ou déjà pris";
  
    if (err.message.includes("email"))
      errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
  
    if (err.code === 11000 && err.keyValue) {
      if (err.keyValue.nom)
        errors.nom = "Ce nom est déjà pris";
      if (err.keyValue.email)
        errors.email = "Cet email est déjà enregistré";
    }
  
    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };
  
    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
      errors.password = "Le mot de passe est incorrect";
  
    return errors;
  };
  