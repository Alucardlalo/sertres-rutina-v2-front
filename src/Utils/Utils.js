import React, {useState} from "react";


const context = React.createContext({asign:0 , setAsign: () => {}})

var Urss = '';


export default function pasar(Urs){

    Urss = Urs;
}

export function pasar2(){

    return Urss;
}