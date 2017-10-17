import {
    Directive, OnInit, ElementRef,
    Input, Output, EventEmitter,
    OnChanges, SimpleChanges, DoCheck
} from '@angular/core';
import { Obfuscator } from './obfuscator'

@Directive({
    selector: '[obfuscatingAnimation]'
})
export class ObfuscatingAnimationDirective implements OnInit, OnChanges, DoCheck {
    private defaults: any
    private options: any
    private elements: any[]
    private running: boolean
    private interval: any
    private revealLock: boolean

    @Input('animationSpeed') speed: number
    @Input('revealDuration') duration: number
    @Input('revealDelay') delay: number
    @Input('revealCondition') condition: boolean

    @Output('complete') complete: EventEmitter<null>

    constructor(private elRef: ElementRef) {
        this.defaults = {
            characters: '█▓▒░█▓▒░█▓▒░<>/',
            exclude: [' '],
            speed: 50,
            duration: 1000,
            delay: 0
        }

        this.speed = 0
        this.duration = 0
        this.delay = 0
        this.condition = false
        this.revealLock = false
        this.complete = new EventEmitter()
    }

    ngOnInit() {
        const host = this.elRef.nativeElement

        this.elements = ([].slice.call(host.children)).map((el: any) => new Obfuscator(el))

        if (this.elements[0].textContent.length === 0) {
            this.ngDoCheck = () => this.waitViewInit(host)
            return
        }

        this.running = false

        this.start()

        if (this.condition) {
            this.reveal()
            this.revealLock = true
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('condition' in changes) {
            if (this.revealLock) {
                return
            }

            if (this.condition) {
                this.reveal()
                this.revealLock = true
            }
        }
    }

    ngDoCheck() { }

    waitViewInit(host: any) {
        this.elements = ([].slice.call(host.children)).map((el: any) => new Obfuscator(el))

        if (this.elements[0].textContent.length === 0) {
            return
        } else {
            this.ngDoCheck = () => { }
        }
    }

    private once() {
        this.elements.forEach((el) => {
            el.write(this.options.characters, this.options.exclude)
        })
        this.running = true
    }

    private start() {
        if (this.interval) {
            clearInterval(this.interval)
        }

        this.options = {
            ...this.defaults, ...{
                speed: this.speed,
                duration: this.duration,
                delay: this.delay
            }
        }

        this.elements.forEach((el) => {
            el.init()
        })

        this.interval = setInterval(() => this.once(), this.options.speed)
        this.running = true
    }

    private stop() {
        clearInterval(this.interval)
        this.running = false
        this.complete.emit(null)
        this.revealLock = false
    }

    reveal() {
        if (!this.options) {
            this.options = {
                ...this.defaults, ...{
                    speed: this.speed,
                    duration: this.duration,
                    delay: this.delay
                }
            }
        }

        let cycles = (this.options.duration / this.options.speed) || 1

        const run = () => {
            clearInterval(this.interval)
            this.running = true
            this.interval = setInterval(() => {
                let elements = this.elements.filter((el) => {
                    return !el.bitmap.every((bit: any) => !bit)
                })

                elements.forEach((el) => {
                    let pace = Math.ceil(el.textContent.length / cycles)
                    el.decay(pace)
                    el.write(this.options.characters, this.options.exclude)
                })

                if (!elements.length) {
                    this.stop()
                    this.elements.forEach(el => el.init())
                }
            }, this.options.speed)
        }

        setTimeout(run, this.options.delay)
    }

}
