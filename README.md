# Angular 4 Obfuscating Animation Directive

# Usage

- Install node_module `angular-obfuscating-animation`

```
$ npm install angular-obfuscating-animation --save
```

- Import ObfuscatingAnimationDirective to your AppModule

``` js
import { NgModule } from '@angular/core'
import { BrowserModule  } from '@angular/platform-browser'

import { AppComponent } from './app.component';
import { ObfuscatingAnimationDirective } from 'angular-obfuscating-animation'

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent
        ObfuscatingAnimationDirective
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

- Use it in your template

``` html
<div obfuscatingAnimation [animationSpeed]="50" [revealDuration]="1000" [revealCondition]="isReveal" (complete)="onRevealComplete()">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam velit quidem consequuntur illo quia placeat, iste ipsa ab ipsam ex quas voluptates? Voluptas libero minus ex, a provident quidem.</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere molestias saepe perspiciatis, fuga iusto, excepturi optio deserunt rem voluptates, rerum ex. Molestiae, animi voluptatem. Aliquam voluptas facilis et beatae soluta!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, pariatur itaque. Distinctio doloribus quisquam, iusto ut maxime adipisci id? Cum ullam quaerat consectetur recusandae illum, iusto beatae eligendi at deserunt.</p>
</div>
```

For a full example, please check out this plunker [example](https://embed.plnkr.co/qX7XBnoVSXtXH04kiEdd/)

# Documentation

#### Properties

``` js
/**
 * @property {number} animationSpeed, timeout speed in milliseconds for each iteration of obfuscation
 */
animationSpeed: 50,

/**
 * @property {number} revealDuration, duration in milliseconds of animation for reveal text
 */
revealDuration: 1000,

/**
 * @property {number} revealDelay, timeout in milliseconds before reveal text after condition is true
 */
revealDelay: 0,

/**
 * @property {boolean} revealCondition, required condition for start reveal text
 */
revealCondition: false,

/**
 * Reveal text animation is complete
 * @event ObfuscatingAnimation#complete
 */
complete: () => {},
```

# Remarks

This is an fork from the javascript library [baffle.js](https://camwiegert.github.io/baffle/) created for [https://camwiegert.com/](https://camwiegert.com/)