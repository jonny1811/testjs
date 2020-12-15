let isBalancedParenthesis = (str) => {
  // transformar la string en un array para aplicar el reduce
  // luego evalua como un booleano de acuerdo al valor sea cero(false) y uno(true)
  return !str.split('').reduce((uptoPrevChar, thisChar) => {
    console.log('acumulador', uptoPrevChar);
    // Comprobar si el string actual es una abertura de parentesis, llave o corchete
    if (thisChar === '(' || thisChar === '{' || thisChar === '[') {
      // aumentar el valor del acumulador
      return ++uptoPrevChar;
      // Comprobar si el string actual es un cierre de parentesis, llave o corchete
    } else if(thisChar === ')' || thisChar === '}' || thisChar === ']') {
      // Disminuir el valor del acumulador
      return --uptoPrevChar;
    }

    // retorna cero o uno
    return uptoPrevChar;
  }, 0);
}

console.log('parenthesisBalancer', isBalancedParenthesis("[()]{}{[()()]()}"));
console.log('parenthesisBalancer', isBalancedParenthesis("[(()])}"));

let snailRearrangement = (array) => {
  
  let arrayRes = [];
  let dir = 'right';
  let iMin = 0;
  let iMax = array.length - 1;
  let jMin = 0;
  let jMax = array.length - 1;

  let i = iMin;
  let j = jMin;
  let done = false;

  // Mientras el iMin o jMin sean menores a iMax o jMax
  // Se niega para ya que toma empieza por false
  while(!done) {
    // Se evalua la direccion que va recorrerse en el array
    switch (dir) {
      // Recorre a la derecha
      case 'right':
        i = iMin;
        j = jMin;
        for (j; j <= jMax; j++) {
          arrayRes.push(array[i][j]); // [1,2,3] [1,2,3,6,9,8,7,4,5]
        }
        // Terminado el recorrido a la derecha cambia hacia abajo
        dir = 'down';
        // Aumenta el iMinimo
        iMin++;
        break;
        // Recorre a la izquierda
      case 'left':
        i = iMax;
        j = jMax;
        for (j; j >= jMin; j--) {
          arrayRes.push(array[i][j]); // [8,7] [1,2,3,6,9,8,7]
        }
        // Terminado el recorrido a la izquierda cambia hacia arriba
        dir = 'up';
        // Disminuye el iMaximo
        iMax--;
        break;
        // Recorre hacia abajo
      case 'down':
        i = iMin;
        j = jMax;
        for (i; i <= iMax; i++) {
          arrayRes.push(array[i][j]); // [6,9] [1,2,3,6,9]
        }
        // Terminado el recorrido hacia abajo cambia a la izquierda
        dir = 'left';
        // Diminuye el jMaximo
        jMax--;
        break;
        // Recorre hacia arriba
      case 'up':
        i = iMax;
        j = jMin;
        for (i; i >= iMin; i--) {
          arrayRes.push(array[i][j]); // [4] [1,2,3,6,9,8,7,4]
        }
        // Terminado el recorrido hacia arriba cambia a la derecha
        dir = 'right';
        // Disminuye el jMinimo
        jMin++;
        break;
    }

    // Evalua si el iMinimo o jMinimo no sean mayores a iMaximo o jMaximo
    if (iMin > iMax || jMin > jMax) {
      done = true;
    }
  }

  // retorna el array ordenado en sentido horario o antihorario
  return arrayRes;
}

console.log('ARRAY', snailRearrangement([[1,2,3], [4,5,6], [7,8,9]]));
console.log('ARRAY', snailRearrangement([[1,2,3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]));

// for (let i = 0; i < array.length; i++) {
//   const arr = array[i];
//   for (let j = 0; j < arr.length; j++) {
//     const vArr = arr[j];
//     if (i === 0) {
//       arrayReArr.push(vArr)
//     }
    
//     if (j === (array.length - 1) && i !== 0) {
//       arrayReArr.push(vArr);
//     } else if (i !== 0) {
//       aux.push(vArr);
//     }
//   }
// }

// aux.sort((a,b) => a - b);
//   let auxChange = 0;
//   for (let i = 0; i < aux.length; i++) {
//     let vAux = aux[i]
//     if (i % 2 !== 0) {
//       i = aux.length;
//     } else {
//       auxChange = vAux;
//       aux[i] = aux[i + 1];
//       aux[i + 1] = auxChange;
//     }
//   }
//   console.log('aux', aux);

//   aux.map((a, i) => {
//     if (i === 0) {
//       arrayReArr.push(aux[aux.length - 1]);
//     } else {
//       arrayReArr.push(aux[aux.length - (i + 1)]);
//     }
//   });