var Typed = new Typed('.text',{
   strings : [  'Coder' , 'Web Developer' ] ,
   typeSpeed : 100 ,
   backSpeed : 100 ,
   backDelay : 1000 ,
   loop : true 
});

var tablinks = document.getElementsByClassName("tab_links") ;
var tabcontents = document.getElementsByClassName("tab_contents");

function opentab(tabname){
   for( tablink of tablinks ){
         tablink.classList.remove("active_link") ;
      }
   for( tabcontent of tabcontents ){
         tabcontent.classList.remove("active_tab") ;
      }

      event.currentTarget.classList.add("active_link");
      document.getElementById(tabname).classList.add("active_tab");
}

function message(){
   var name = document.getElementById("name") ;
   var email = document.getElementById("email")   ;
   var subject = document.getElementById("subject")  ;
   var text = document.getElementById('text')  ;

   const succes = document.getElementById('success');
   const danger = document.getElementById('danger') ;

   if( name.value === '' || email.value === '' || subject.value === '' || text.value === '' )
      {
         // console.log("Null");
         succes.style.display = 'none' ;
         danger.style.display = 'block' ;
      }
      else{
         var body = 'Name: '+ name + '<br/> Email: '+email + '<br/> subject: ' + subject + '<br/> Message: ' + message ; 
         Email.send({
            Host : "smtp.elasticemail.com",
            Username : "aroy104321@gmail.com",
            Password : "aflkvkfa",
            To : 'aroy104321@gmail.com',
            From : email.value,
            Subject : subject.value,
            Body : body 
        }).then(
          message => alert(message)
        );

         setTimeout(() => {
            name.value = email.value = subject.value = text.value =   '' ;

         }, 2000 ) ;
         danger.style.display = 'none' ;
         succes.style.display = 'block' ;
      }

      setTimeout( () => {
         danger.style.display = 'none' ;
         succes.style.display = 'none';
      } , 2000 ) ;
};
