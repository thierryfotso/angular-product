import { mount } from 'cypress/angular';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('LoginComponent', () => {

  class AuthServiceMock {
  }

  beforeEach(() => {
    mount(LoginComponent, {
      imports: [
         RouterModule.forRoot([])],
      providers: [
        provideHttpClient(),
        { provide: 'AuthService', useClass: AuthServiceMock }],
    });
  });


  it('should render the login form', () => {
    cy.get('form').should('be.visible');
  });

  it.only('should display email and password inputs', () => {
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="password"]').should('exist');
  });
    
  it('should submit the form with valid credentials', () => {
    cy.get('input[type="text"]').type('user');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="button"]').click();
  });
  
});