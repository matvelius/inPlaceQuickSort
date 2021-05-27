// ID успешной посылки: 51681300

// ПРИНЦИП РАБОТЫ

// Как и в обычной быстрой сортировке, здесь важен шаг выбора опорного элемента (я 
// использовал метод Ломуто) и последующее разделение массива на две части: элементы 
// равные или меньше опорного слева, а те что больше - справа. 

// Чтобы избежать создания нового массива и не использовать лишнюю память, используется
// функция swapValuesAtIndices, которая просто меняет местами элементы по двум индексам.

// Сравнение результатов двух участников состоит из одной, двух или даже трех ступеней: 
// 1) сначала сравнивается кол-во решенных задач; 
// 2) если эти числа равны, то смотрим у кого из участников меньше штраф;
// 3) если штрафы равны, то просто сортируем участников по алфавиту 

// ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

// Моя реализация преобразует входные данные в массив объектов Participant и постепенно 
// переставляет их местами в ходе работы алгоритма.

// Функция partition использует цикл, в процессе которого правый индекс постепенно движется 
// влево, а левый - вправо в случае, если участник, найденный по правому индексу, меньше 
// опорного. Цикл длится до тех пор, пока правый и левый индексы не встретятся. После 
// остановки цикла, опорный элемент переставляется туда, куда указывает правый индекс.

// Главная функция inPlaceQuickSort рекурсивно вызывает саму себя в правой и левой части 
// разделенного массива.

// ВРЕМЕННАЯ СЛОЖНОСТЬ

// O(nlog(n)), так же как и обычный QuickSort.

// ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

// Все данные программы хранятся в одном и том же массиве размера n, который создается
// при считывании входящих данных. Таким образом, пространственная сложность моего 
// алгоритма - O(n).

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineIndex = 0
let numberOfParticipants = 0
let array = []

class Participant {
  constructor(name, p, f) { // p == # of problems solved, f == fine
    this.name = name
    this.p = p
    this.f = f
  }
}

function addParticipant(participant) {
  const participantArray = participant.split(" ")
  const participantObject = new Participant(participantArray[0], parseInt(participantArray[1]), parseInt(participantArray[2]))
  array.push(participantObject)
}

function printSortedNames() {
  var outputText = ""
  for (let i = 0; i < array.length; i++) {
    outputText += array[i].name + "\n"
  }
  console.log(outputText)
}


function inPlaceQuickSort(array, left, right) {
  if (left >= right) {
    return
  }
  if (array.length <= 1) {
    return
  }

  let p = partition(array, left, right) // p is the index of the pivot

  inPlaceQuickSort(array, left, p)
  inPlaceQuickSort(array, p + 1, right)

}

function partition(array, left, right) {
  if (array.length <= 1) {
    return 0
  }

  var l = left
  var r = right - 1
  let pivotObject = array[r]

  while (r > l) {
    if (!isABiggerThanB(array[r - 1], pivotObject)) {
      array[r] = array[r - 1]
      r--
    } else { // array[r - 1] <= pivotObject
      swapValuesAtIndices(l, r - 1)
      l++
    }
  }

  array[r] = pivotObject
  return r // index of pivot
}

function isABiggerThanB(A, B) {
  if (A.p == B.p) {
    if (A.f == B.f) {
      return A.name < B.name
    } else {
      return B.f - A.f > 0
    }
  } else {
    return A.p - B.p > 0
  }
}

function swapValuesAtIndices(index1, index2) {
  const temp = array[index1]
  array[index1] = array[index2]
  array[index2] = temp
}

rl.on('line', function (line) {

  if (lineIndex == 0) {

    numberOfParticipants = parseInt(line)

    if (numberOfParticipants == 0) {
      rl.close()
      return
    }

  } else if (lineIndex < numberOfParticipants) {

    addParticipant(line)

  } else { // last line

    addParticipant(line)

    rl.close()

    inPlaceQuickSort(array, 0, array.length)
    printSortedNames()
  }

  lineIndex += 1
})