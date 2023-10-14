import { Directive, HostListener, ElementRef, HostBinding, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  dropdownMenu: ElementRef | undefined;

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen() {
    if (this.dropdownMenu) {
      if (this.isOpen) {
        this.renderer.removeClass(this.dropdownMenu, 'show');
      } else {
        this.renderer.addClass(this.dropdownMenu, 'show');
      }
      this.isOpen = !this.isOpen;
    }

  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
  }

}
