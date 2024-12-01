import { loginInfo, updateInfo } from "../fixtures/data";
import { loginToken } from "../fixtures/data";
import { baseUrl } from "../fixtures/data";

describe('Go Rest', () => {

    it("Create Post Request", () => {
        cy.request({
            method: "POST",
            url:  baseUrl.url,
            headers: {
                'Authorization' : 'Bearer ' + loginToken.token
            },
            body: {
                    "name": loginInfo.name,
                    "gender": loginInfo.gender,
                    "email": loginInfo.email,
                    "status": loginInfo.status
            },
        }).then(response => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("name").and.eq(loginInfo.name);
            expect(response.body).to.have.property("gender").and.eq(loginInfo.gender);
            expect(response.body).to.have.property("status").and.eq(loginInfo.status);
            expect(response.body).to.have.property("id");
            var  id = response.body.id;
        }).then( () => {
            cy.request({
                method: "GET",
                url:  baseUrl.url + id,
            }).then( () => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property("id");
                expect(response.body).to.have.property("name").and.eq(loginInfo.name);
                expect(response.body).to.have.property("gender").and.eq(loginInfo.gender);
                expect(response.body).to.have.property("status").and.eq(loginInfo.status);
            }).then( () => {
                cy.request({
                    method: "PATCH",
                    url:  baseUrl.url + id,
                    headers: {
                        'Authorization' : 'Bearer ' + loginToken.token
                    },
                    body: {
                            "name": updateInfo.name,
                            "gender": updateInfo.gender,
                            "email": updateInfo.email,
                            "status": updateInfo.status
                    },
                }).then( () => {
                    cy.request({
                        method: "GET",
                        url:  baseUrl.url + id,
                    }).then( () => {
                        expect(response.status).to.eq(201);
                        expect(response.body).to.have.property("id");
                        expect(response.body).to.have.property("name").and.eq(updateInfo.name);
                        expect(response.body).to.have.property("gender").and.eq(updateInfo.gender);
                        expect(response.body).to.have.property("status").and.eq(updateInfo.status);
                    })
                }).then( () => {
                    cy.request({
                        method: "DELETE",
                        url:  baseUrl.url + id,
                    }).then( () => {
                        expect(response.status).to.eq(204);
                    }).then( () => {
                        cy.request({
                            method: "GET",
                            url:  baseUrl.url + id,
                        }).then( () => {
                            expect(response.body).to.have.property("message");
                        })
                    })
                })
            });
        });

    });   

});
