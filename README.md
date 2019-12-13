# Practica-5

## Mutaciones

Para añadir equipos

```graphql
mutation{
  addEquipo(nombre: "<nombre del equipo>"){
    nombre
    _id
   }
}
```

Para añadir partidos

```graphql
mutation{
  addPartido(equipolocal: "<nombre del equipo>", eqipovisit: "<nombre del otro equipo>"){
    _id
    equipolocal{
      nombre
      _id
    }
    equipovisit{
      nombre
      _id
    }
    fecha
    resultado
    gamestatus
   }
}
```

Para cambiar el resultado

```graphql
mutation{
   actPartido(_id: "<id del partido a modificar>", resultado: "0-0"){
    resultado
    gamestatus
   }
}
```

Para cambiar el estado, los estados pueden ser 0,1 o 2 simbolizando sin empezar, empezado, terminado respectivamente, en la mutacion solo se podra poner 1 o 2

```graphql
mutation{
   status(_id: "<id del partido a modificar>", gamestatus: 1){
    resultado
    gamestatus
   }
}
```

## Suscripciones

Todas las mutaciones que modifiquen algun partido mandan el partido modificado a todas las suscripciones de equipos del partido y el partido en si mismo

Para poder suscribirte se usan los comandos:

```graphql
subscription{
  subequipo(_id: "<id del equipo>"){
    resultado
    .
    .
    .
   }
}
```

```graphql
subscription{
  subpartido(_id: "<id del partido>"){
    resultado
    .
    .
    .
   }
}
```
