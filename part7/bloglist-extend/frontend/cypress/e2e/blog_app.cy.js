describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.createUser({ name: "Emilie", username: "user1", password: "user1pwd" });
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("user1");
      cy.get("#password").type("user1pwd");
      cy.get("#login-button").click();

      cy.contains("Emilie logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("user1");
      cy.get("#password").type("user1");
      cy.get("#login-button").click();

      cy.get(".msg")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Emilie logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "user1", password: "user1pwd" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#note-title").type("this is a new blog");
      cy.get("#note-author").type("Emilie");
      cy.get("#note-url").type("localhost:5173");

      cy.contains("create").click();
      cy.get("html").should("contain", "this is a new blog");
      cy.get(".msg")
        .should("contain", "a new blog this is a new blog by Emilie added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "this is another blog",
          author: "cypress",
          url: "localhost:5173",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("this is another blog").contains("view").click();
        cy.contains("likes").click();
      });

      it("a blog can be deleted by the user who created it", function () {
        cy.contains("this is another blog").contains("view").click();
        cy.contains("remove").click();
      });

      it("a blog delete button can not be saw from another user", function () {
        cy.contains("logout").click();
        cy.createUser({
          name: "new user",
          username: "user2",
          password: "user2pwd",
        });
        cy.login({ username: "user2", password: "user2pwd" });
        cy.contains("this is another blog").contains("view").click();

        cy.contains("this is another blog").should("not.contain", "remove");
      });
    });

    describe("and several blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the most likes",
          author: "cypress",
          url: "localhost:5173",
        });
        cy.createBlog({
          title: "The title with the second most likes",
          author: "cypress",
          url: "localhost:5173",
        });
        cy.createBlog({
          title: "The title with the third most likes",
          author: "cypress",
          url: "localhost:5173",
        });
      });

      it("blogs are ordered according to likes", () => {
        cy.contains("The title with the most likes").as("mostLikes");
        cy.get("@mostLikes").contains("view").click();
        cy.get("@mostLikes").contains("likes").click();
        cy.wait(500);
        cy.get("@mostLikes").contains("likes").click();
        cy.wait(500);
        cy.get("@mostLikes").contains("likes").click();
        cy.wait(500);

        cy.contains("The title with the second most likes").as(
          "secondMostLikes",
        );
        cy.get("@secondMostLikes").contains("view").click();
        cy.get("@secondMostLikes").contains("likes").click();

        cy.get(".blog")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "The title with the second most likes");
        cy.get(".blog")
          .eq(2)
          .should("contain", "The title with the third most likes");
      });
    });
  });
});
