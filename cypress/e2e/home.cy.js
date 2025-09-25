import { url } from "../../utilits";
describe("Documents flow", () => {
  let documentId;

  beforeEach(() => {
    // Skapa dokument direkt via API
    cy.request("POST", `${url}/api/document`, {
      title: "Test document",
      content: "Content from Cypress",
    }).then((response) => {
      documentId = response.body.document._id;
    });

    // Besök frontend
    cy.visit("http://localhost:3000");
  });

  afterEach(() => {
    if (documentId) {
      // Ta bort dokumentet via API
      cy.request("DELETE", `${url}/api/document/delete/${documentId}`);
    }
  });

  it("should show a list of documents", () => {
    cy.get("h1", { timeout: 10000 })
      .should("exist")
      .and("have.length.at.least", 1);
  });

  it("should navigate to a document page", () => {
    cy.contains("a", "Test document").click();
    cy.url().should("include", "/");
    cy.get("h1, h2, h3", { timeout: 10000 }).should("exist");
  });

  it("should allow user to add a new document", () => {
    cy.contains("a", "Add").click();
    cy.url().should("include", "/add");
    cy.contains("h1", "Create new document");

    cy.get('input[placeholder="Titel på issue"]').type("Another document");
    cy.get(".CodeMirror").first().click().type("Content from Cypress :)");
    cy.contains("button", "Create document").click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("a", "Another document");

    cy.contains("a", "Another document").click();
    cy.contains("button", "Delete").click();

    cy.get('div[role="alertdialog"]').within(() => {
      cy.contains("button", "Delete").click();
    });
  });

  it("should navigate to edit a document", () => {
    cy.contains("a", "Test document").click();
    cy.contains("a", "Edit").click();
    cy.get('input[placeholder="Titel på issue"]').clear().type("Updated title");
    cy.get(".CodeMirror").first().click().type("Updated content from Cypress");
    cy.contains("button", "Update document").click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("a", "Updated title");
  });

  it("should delete a document", () => {
    cy.contains("a", "Test document").click();
    cy.contains("button", "Delete").click();

    cy.get('div[role="alertdialog"]').within(() => {
      cy.contains("button", "Delete").click();
    });

    cy.contains("a", "Test document").should("not.exist");
    documentId = null;
  });
});
