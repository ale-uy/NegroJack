###################################################################################################################################################

import time
import random

print('\n\n*************************** BlackJack by LASM84 ***************************\n\n')
time.sleep(3)

###################################################################################################################################################

crupierCartas=[]
crupierPuntos=0

jugadorCartas=[]
jugadorPuntos=0

###################################################################################################################################################

def cartas():
    figuras=['As','Dos','Tres','Cuatro','Cinco','Seis','Siete','Ocho','Nueve','Diez','Jota','Reina','Rey']
    palos=['Corazones','Diamantes','Picas','Treboles']
    valores=[11,2,3,4,5,6,7,8,9,10,10,10,10]
    cartas={figuras[i].upper()+' de '+palos[j].upper():valores[i] for i in range(0,len(figuras)) for j in range(0,len(palos))}
    return cartas
cartas=cartas()

def barajar():
    barajas=list(cartas.keys())
    n=0
    while n<100:
        random.shuffle(barajas)
        n+=1
    return barajas
barajas=barajar()

###################################################################################################################################################

def repartir():
    global crupierPuntos, jugadorPuntos
    print('\nEl crupier comienza a barajar las cartas...\n')
    time.sleep(5)
    crupierCartas.append(barajas[0])
    crupierPuntos=cartas[barajas[0]]
    print('\nLa primer carta del crupier es "{}" con un valor de "{}"\n'.format(*crupierCartas, crupierPuntos))
    time.sleep(2)
    jugadorCartas.append(barajas[1])
    jugadorCartas.append(barajas[2])
    jugadorPuntos=cartas[barajas[1]]+cartas[barajas[2]]
    print('Tus primeras cartas son "{}" y "{}" con un valor total de "{}"\n'.format(*jugadorCartas, jugadorPuntos))
    time.sleep(3)
    pasar=input('\nPara pasar escribe la palabra "pasar" o enter para pedir otra carta: ')
    i=3
    while pasar.lower()!='pasar':
        jugadorCartas.append(barajas[i])
        jugadorPuntos+=cartas[barajas[i]]
        args = ' "{}"'*i
        print('\nSus cartas son'+args.format(*jugadorCartas)+' con un puntaje total de "{}"\n'.format(jugadorPuntos))
        i+=1
        time.sleep(3)
        if jugadorPuntos>21:
            return
        else:
            pasar=input('\nPara pasar escribe la palabra "pasar" o enter para pedir otra carta: ')
    pass
    time.sleep(3)
    crupierCartas.append(barajas[len(jugadorCartas)+1])
    crupierPuntos+=cartas[barajas[len(jugadorCartas)+1]]
    print('\nLas primeras cartas del crupier son "{}" y "{}" con un valor total de {}\n'.format(*crupierCartas, crupierPuntos))
    time.sleep(3)
    if crupierPuntos>21:
        return
    elif crupierPuntos>16 or crupierPuntos>=jugadorPuntos:
        pass
    else:
        while crupierPuntos<16 or crupierPuntos<jugadorPuntos:
            crupierCartas.append(barajas[i+1])
            crupierPuntos+=cartas[barajas[i+2]]
            kwargs = ' "{}"'*len(crupierCartas)
            print('Las cartas del crupier son'+kwargs.format(*crupierCartas) +' con un valor total de {}\n'.format(crupierPuntos))
            i+=1
            time.sleep(3)
    pass

####################################################################################################################################################

def ganador():
    if jugadorPuntos>21:
        print('Te pasas de 21 por lo que PERDISTE...')
    elif crupierPuntos>21:
        print('El crupier se paso de 21 por lo que tu GANASTE!!!')
    elif jugadorPuntos>crupierPuntos:
        print('GANASTE!!!')
    elif jugadorPuntos<crupierPuntos:
        print('PERDISTE...')
    else:
        if jugadorPuntos==crupierPuntos==21:
            print('El crupier obtuvo 21 por lo que tu PIERDES!!!')
        else:
            print('Es un empate, ninguno gana')
    pass

####################################################################################################################################################

si = True

while si == True:
    repartir()
    ganador()
    time.sleep(2)
    respuesta = input('\nQuieres jugar de nuevo? (SI): ')
    if respuesta.upper() != 'SI':
        si = False
    else:
        pass
    
input('\nEnter para salir y gracias por jugar :)')

####################################################################################################################################################
