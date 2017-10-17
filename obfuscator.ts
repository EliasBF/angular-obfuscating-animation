export class Obfuscator {
    element: any
    textContent: string
    bitmap: any

    constructor(element: any) {
        this.element = element
        this.textContent = element.textContent
        this.init()
    }

    init() {
        this.bitmap = this.textContent.split('').map(() => 1)
    }

    write(chars: string[], exclude: string[]) {
        this.element.textContent = this.render(chars, exclude)
    }

    render(chars: string[] = [], exclude: string[] = []) {
        if (!chars.length) {
            return this.textContent
        }

        return this.textContent.split('').map((char, index) => {
            if (exclude.indexOf(char) > -1) {
                return char
            }

            return this.bitmap[index]
                ? chars[Math.floor(Math.random() * chars.length)]
                : char
        }).join('')
    }

    decay(count = 1) {
        while (count--) {
            let on = this.bitmap.map((item: any, index: any) => {
                if (!item) {
                    return false
                }

                return index
            }).filter((i: any) => i !== false)

            this.bitmap[on[Math.floor(Math.random() * on.length)]] = 0
        }
    }
}
