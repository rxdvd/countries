/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('it has a title', () => {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("Country, Client side")
        })
    })

    describe('body', () => {
        describe.skip('button', () => {
            let button;

            beforeEach(() => {
                button = document.querySelector('[type=submit]')
            })

            test('it exists', () => {
                expect(button).toBeTruthy();
            })

            test('it has a call to action', () => {
                expect(button.textContent.toLowerCase()).toContain('click')
            })

        })

        describe('form', () => {
            let form;
            let nameInput, ageInput, submitBtn;
            beforeEach(() => {
                form = document.querySelector('form')
                nameInput = form.querySelector('#name');
                cityInput = form.querySelector('#city')
                submitBtn = form.querySelector('[type="submit"]');
            })
    
            test('it exists', () => {
                expect(form).toBeTruthy();
            });
    
            describe('name input', () => {
                test('it has an id of "name"', () => {
                    expect(nameInput).toBeTruthy();
                })

                test('it is a text input"', () => {
                    expect(nameInput.getAttribute('type')).toBe('text')
                })
        
                test('it has a label"', () => {
                    expect(document.querySelector('[for="name"]')).toBeTruthy();
                })
            })

            describe('age input', () => {
                test('it has an id of "age"', () => {
                    expect(cityInput).toBeTruthy();
                })

                test('it is a number input"', () => {
                    expect(cityInput.getAttribute('type')).toBe('text')
                })
        
                test('it has a label"', () => {
                    expect(document.querySelector('[for="city"]')).toBeTruthy();
                })
            })
    
            describe('submit button', () => {
                test('it says "Add Country!', () => {
                    expect(submitBtn.value).toBe('Add Country');
                })
            })

        })

        test('it has a section to display the countries', () => {
            expect(document.querySelector('section#country')).toBeTruthy();
        })
    })

})
