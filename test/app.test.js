/**
* @jest-environment jsdom
*/


const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


global.fetch = require('jest-fetch-mock');
let app;


describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/app')
        helper = require('../static/js/helpers')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('requests', () => {
        describe('getAllCountries', () => {
            test('it makes a get request to /country', () => {
                app.getAllCountries();
                // expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/cats$/))
                expect(fetch.mock.calls[0][0]).toMatch(/country$/)
            })

            
        });

        describe('submitCountry', () => {
            test('it makes a post request to /country with the country data', () => {

                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        name: { value: 'Nigeria' },
                        city: { value: "Lagos" }
                    }
                }

                app.submitCountry(fakeSubmitEvent);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ name: 'Nigeria', city: "Lagos" }));
            })
        })

        describe('getCountries to have been called', () => {
            test('it makes a request to /', () => {
                app.getAllCountries();
                expect(fetch).toHaveBeenCalled();
            })
        })

        describe('render helpers', () => {
    
            describe('appendCountry', () => {
                test('it renders a new li on the page with the country data', () => {
                    const liCount = document.querySelectorAll('li').length;
                    helper.setCountry([{ name: 'Nigeria', city: "Lagos" }]);
                    const newLiCount = document.querySelectorAll('li').length;
                    expect(newLiCount).toEqual(liCount + 1)
                    expect(document.querySelector('section#country').textContent).toContain("Nigeria");
                    expect(document.querySelector('section#country').textContent).toContain("Lagos");
                })
            })
            
        })

    })

})
