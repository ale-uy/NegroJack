//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cree todo el juego basado en funciones, la principal (BlackJack) es la que controla el resultado de las secundarias. Ademas al resultado de cada
//funcion lo asigne a una variable para hacerlo mas facil de manejar (y no tener que llamar de nuevo la funcion cada vez). Paso a explicar algunos
//puntos: "alert" hace un llamado de atencion en pantalla, "document.write" lo que hacen es escribir lo que le pedimos en una pagina en blanco y 
//"prompt" funciona como alert pero le pide al usuario ingresar algo desde el teclado, asi puedo asignar ese valor a una variable (pasar) y la uso
//para saber cuando terminar el bucle FOR en las funciones del jugador. Tambien uso algunas etiquetas HTML (las que usan los <>) de cursos 
//anteriores para darle formato al texto que muestra en pantalla el juego.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Blackjack(){

alert("COMIENZA EL JUEGO");
document.write("<center><br><h1><u>Proyecto BlackJack</u></h1></br></center>");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Con esta funcion creo la baraja, uso palos y figuras para darle un nombre mas "lindo" y luego uno estas variables en la clave "palo" del 
//diccionario agregando un + de + para que forme el texto que quiero.
function barajas(){
	var palos=['Corazones','Diamantes','Picas','Treboles'];
	var figuras=[' As',' Dos',' Tres',' Cuatro',' Cinco',' Seis',' Siete',' Ocho',' Nueve',' Diez',' Jota',' Reina',' Rey'];
	var valores=[11,2,3,4,5,6,7,8,9,10,10,10,10];
	var baraja=[];
	var n=0;
	for (var i=0; i<palos.length; i++){
		for (var j=0; j<figuras.length; j++){
			baraja[n]={palo:figuras[j]+' de '+palos[i], valor:valores[j]};
			n++;
		}
	}
	return baraja;
};
var baraja=barajas();

document.write("<center><br><br><h3>El Crupier muestra la baraja del juego</h3></br></br></center>");

//Aqui hago que el diccionario solo me muestre las claves del diccionario (lo que llame "palo") para presentarlo en pantalla con document.write
function barajaCompleta(){
	baraja;
	var barajaC=[];
	var n=0;
	for (var i=0; i<baraja.length; i++){
		barajaC[n]=baraja[i].palo;
		n++
	}
	return barajaC;
};
var barajaC=barajaCompleta();

document.write("<center><i>"+barajaC+"</i></center>");

// Defino una funcion auxiliar para barajar, esto lo tome de internet, pero en palabras simples lo que hace es intercambiar la posicion de una
//elemento por el de otro unas 52 veces que es el "length" de la baraja de cartas.
function mezcla(a) {
	var cI = a.length, temp, rand;
	while (0 !== cI) {
		rand = Math.floor(Math.random() * cI);
		cI -= 1;
		temp = a[cI];
		a[cI] = a[rand];
		a[rand] = temp;
	}
	return a;
};
var mazo=mezcla(baraja);
// Uso la funcion auxiliar para mezclar las barajas creadas

document.write("<center><br><h3>El Crupier mezcla las cartas...........</h3></br></center>");

var pasar=prompt('elige el puntaje maximo para pedir mas cartas: ');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Aqui lo que se me ocurrio al repartir es asignar la mitad de las cartas al jugador y la otra mitad al crupier (unas funciones mas adelante), es 
//invisible a los ojos y lo uso para luego sacar de a una en el reparto que si muestra la pantalla
function repartirJugador(){
	mazo;
	var manoJugador=[];
	var n=0
	for (var i=1; i<mazo.length; i=i+2){
		manoJugador[n]=mazo[i];
		n++
	}
	return manoJugador;
};
var manoJugador=repartirJugador();

//La funcion toma el valor de las primeras barajas de la funcion de arriba (sacadas del diccionario del inicio con la palabra ".valor") hasta que
//se llegue al puntaje minimo que se marque en el prompt (la ventanita) que  nos aparece al jugar, el resto de las cartas quedan descartadas.
function puntuaJugador(){
	manoJugador;
	pasar;
	var pts=0;
	for (var i=0; pts<pasar; i++){
		pts+=manoJugador[i].valor;
	}
	return pts;
};
var puntosJ=puntuaJugador();

//Por ultimo, muestro las cartas que no fueron descartadas (solo el "palo" sin el valor)y que son las que dan el puntaje final al jugador.
function cartasJugador(){
	manoJugador;
	pasar;
	var cartasJugador=[];
	var pts=0;
	var n=0;
	for (var i=0; pts<pasar; i++){
		pts+=manoJugador[i].valor;
		cartasJugador[n]=manoJugador[i].palo;
		n++;
	}
	return cartasJugador;
};
var cartasJ=cartasJugador();

document.write("<center><br><h3>Tus cartas son </h3></br><i>"+cartasJ+"</i></center>");
document.write("<center><br><h3>Con un valor total de </h3></br><i>"+puntosJ+" Puntos</i></center>");


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Hago lo mismo que para el jugador, pero con el crupier.
function repartirCrupier(){
	mazo;
	var manoCrupier=[];
	var n=0
	for (var i=0; i<mazo.length; i=i+2){
		manoCrupier[n]=mazo[i];
		n++
	}
	return manoCrupier;
};
var manoCrupier=repartirCrupier();

//Tomo como valor minimo el 16, sacado de las reglas que lei en internet, y le agrego un "and(&&)" para que si aun pasando los 16 no puede ganar
//siga tomando cartas (no se si las reglas lo permiten, solo lo hago por logica de no perder sin pelear).
function puntuaCrupier(){
	manoCrupier;
	puntosJ;
	var pts=0;
	for (var i=0; pts<puntosJ && pts<17; i++){
		pts+=manoCrupier[i].valor;
	}
	return pts;
};
var puntosC=puntuaCrupier();

function cartasCrupier(){
	manoCrupier;
	var cartasCrupier=[];
	var pts=0;
	var n=0;
	for (var i=0; pts<17; i++){
		pts+=manoCrupier[i].valor;
		cartasCrupier[n]=manoCrupier[i].palo;
		n++;
	}
	return cartasCrupier;
};
var cartasC=cartasCrupier();

document.write("<center><br><h3>Las cartas del Crupier son </h3></br><i>"+cartasC+"</i></center>");
document.write("<center><br><h3>Con un valor total de </h3></br><i>"+puntosC+" Puntos</i></center>");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Al final, la funcion de aqui nos dira quien es el ganador y que imprimir en pantalla segun el resultado del juego.
function ganador(){
	puntosC;
	puntosJ;
	var gana="";
	if (puntosJ>21){
		gana="Crupier";
	}
	else if (puntosJ==21){
		gana="Jugador con un BlackJack";
	}
	else if (puntosC>21){
		gana="Usted";
	}
	else if (puntosJ>puntosC){
		gana="Usted";
	}
	else if (puntosJ<puntosC){
		gana="Crupier";
	}else{
		gana="ninguno, hay empate";
	}
	return gana;
};
var gana=ganador();

document.write("<center><br><h2>El Ganador es </h2><h1><u>"+gana+"</u></h1></br></center>");

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Y sin esta ultima, que "llama" a la funcion principal, el juego no podria empezar.
Blackjack();