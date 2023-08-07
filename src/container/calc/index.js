// клас  з початковим знач = '',
class Calc {
  static #value = ''
  // *тут лежить ключ для будь-якого имені(результату, який треба зберегти в window.localStorage)
  static #NAME = 'calc'
  // властивіть, що вказує: стоіть вже крапка чині
  static #isDot = false
  // метод для '+'
  static add = (newValue) => {
    // для написання 1000000 перевірка, чи передостанній символ це число? то 0 не можна. а якщо, це оператор, то можна
    if (isNaN(this.#value[this.#value.length - 2])) {
      if (
        // для написання 1000000.... якщо перша цифра в числі не є 0, то ще 0 не можна
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot == false
      ) {
        return null
      }
    }

    this.#value = this.#value.concat(newValue)
    // додаєм в кінець певний рядок
    this.#output()
  }
  // метод для вписування значень
  static #output = () => {
    this.#save()
    window.output.innerHTML = this.#value
  }
  // підтримка крапки через dot. (Вписати це в omclick в hbs!)
  static dot = () => {
    // перевірка чи є крапка, повернути 0, і код не виконується далі.
    if (this.#isDot) {
      return null
    }
    // ???перевірка аналогічна, що й з операторами, чи є число?
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat('.')
    this.#output()
    // по замовчуванню було:static #isDot = false, а якщо мі вже вставили одну, то тільки після  оператора повторно
    // зможемо використати з цифрами
    this.#isDot = true
  }
  // для кнопок с діями:+-*/. функція метод - оновлюем наше внутрішне значеня через concat
  // додаємо в кінець та викликаєм this.#output()
  // цей метод прив-язати до кнопок в hbs <button onclick="calc.op('+')">+</button>
  static op = (opValue) => {
    //???для перевірки чи є число перед використанням матем.оператора якщо в середині велью остання литера (вираховуємо по довжини рядка -1)
    // не є числом, то повернути 0. В шншому - додати символ
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDot = false
  }
  // метод для спустошення значень. в value покладе пустий рядок та виконає вівід на єкран
  // привязати в button onclick="calc.reset()">C</button
  static reset = () => {
    this.#value = ''
    // не обхідно очищувати значення(.) після сбросу зачення
    this.#isDot = false
    this.#output()
  }
  // 1.===eval= це якась функція, що виконує скрипт-код
  // 2.перетворюємо в рядок, щоб скористатися ф-цією concat
  // 3. використ output, щоб актуальне значення покласти в тег window.output.innerHTML = this.#value
  //  привязати до кнопки <button onclick="calc.result()">=</button>
  static result = () => {
    this.#value = String(eval(this.#value))
    this.#output()
  }
  // **********************************************
  // 1.статичнійвнутрішній метод для сбереження рез-ту обчисленя навіть пи закритті вкладки
  // обратится с window.localStorage→установить setItem передаст значення из this.#value
  // будемо звртатися завжді перед виведенням результату - запис у сховище
  static #save = () => {
    window.localStorage.setItem(this.#NAME, this.#value)
  }
  // 2.підгружає та віддає значення getItem по його  їмені this.#NAME з window.localStorage, або пустий рядок
  static #load = () => {
    // 2.1. Результат ф-ціі покласти в this.#value
    this.#value =
      window.localStorage.getItem(this.#NAME) || ''
  }
  // 3. стат метод, викликає load(значення по ключу)
  // та буде в консоль лог ініціалізувати наш калькулятор
  // та сгенерувалось конкретне попереднє значення calc в this.#output()
  static init = () => {
    this.#load()
    this.#output()
    console.log('Calc is init')
  }
}

Calc.init()

// в будь якув властивість ми поклали наш клас Calc для прямого доступу по слову calc.
// Набираемо в консолі calc і отримуємо доступ до нашого класу
//  Щоб можна біло в бразері в консолі звернутися до цього класу
window.calc = Calc
