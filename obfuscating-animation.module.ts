import { NgModule } from '@angular/core'
import { ObfuscatingAnimationDirective } from './obfuscating-animation.directive'

@NgModule({
    declarations: [
        ObfuscatingAnimationDirective
    ],
    exports: [
        ObfuscatingAnimationDirective
    ]
})
export class ObfuscatingAnimationModule {}
