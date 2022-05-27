const form = $("form#contact_form");
form.submit(function(event){
    event.preventDefault();

    const service_id="gmail";
    const template_id="email_form";

    form.find("button").text("Enviando....");
    emailjs.sendForm(service_id, template_id, form[0])
    .then(function (){
        alert("El correo ha sido enviado correctamente. Nos pondremos en contacto con usted lo más rápido posible");
    }, function(err){
        alert("Ha ocurrido un error al enviar el correo.", err);
    });
    return false;
});