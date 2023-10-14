import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavbarDirectives]'
})
export class NavbarDirectivesDirective {
  private isOpen: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    const buttonElement = this.elementRef.nativeElement.querySelector('.navbar-toggler');

    if (buttonElement && buttonElement.contains(target)) {
      const dropdownMenu = this.elementRef.nativeElement.querySelector('.navbar-collapse');

      if (dropdownMenu) {
        if (this.isOpen) {
          this.renderer.removeClass(dropdownMenu, 'show');
        } else {
          this.renderer.addClass(dropdownMenu, 'show');
        }

        this.isOpen = !this.isOpen;
      }
    }
  }
}