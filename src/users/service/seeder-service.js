const db = require('../../../db')
const positionService = require('./position-service')


class SeederService {
   static firstNames = [
      "John", "Jane", "Alex", "Chris", "Katie", "Michael", "Sarah", "David", "Emily", "Robert",
      "Jessica", "Daniel", "Laura", "Matt", "Emma", "Nick", "Linda", "George", "Samantha", "James",
      "Olivia", "Jacob", "Sophia", "Andrew", "Mia", "Joshua", "Isabella", "Ryan", "Charlotte", "Ethan",
      "Ava", "Benjamin", "Liam", "Amelia", "Lucas", "Harper", "Mason", "Abigail", "Elijah", "Ella",
      "Logan", "Chloe", "Caleb", "Zoey", "Henry", "Grace", "Jackson", "Scarlett", "Aiden", "Victoria", "Anastasia", "Andriy", "Anna", "Artem", "Bohdan", "Daryna", "Denys", "Dmytro", "Iryna", "Ivan",
      "Kateryna", "Kyrylo", "Larysa", "Lilia", "Maksym", "Mariya", "Mykhailo", "Natalia", "Nazar", "Oksana",
      "Oleksandr", "Olena", "Oleh", "Olha", "Orest", "Petro", "Polina", "Rostyslav", "Ruslan", "Sofiia",
      "Svitlana", "Taras", "Tetyana", "Vadym", "Valentyna", "Vasyl", "Viktor", "Viktoriya", "Volodymyr", "Yana",
      "Yaroslav", "Yelyzaveta", "Yuriy", "Zoriana", "Bogdan", "Diana", "Eugenia", "Galyna", "Halyna", "Igor",
      "Illia", "Ihor", "Inna", "Iryna", "Karina", "Kateryna", "Khrystyna", "Ksenia", "Lidiya", "Liubov",
      "Lyudmila", "Maksym", "Marina", "Marta", "Mykola", "Nadiia", "Nina", "Oleksiy", "Olenka", "Olia",
      "Oxana", "Pavlo", "Radomyr", "Roksana", "Roman", "Serhiy", "Sergiy", "Slavko", "Sofiya", "Stanislav",
      "Stepan", "Tetiana", "Tymofiy", "Vasilisa", "Veronika", "Vira", "Vitaliy", "Vladyslav", "Vsevolod", "Yevhen",
      "Zinaida", "Zoya", "Yuliya", "Oleksa", "Pavlina", "Myroslava", "Zenovia", "Daryna", "Omelian", "Kiril", "Alejandro", "Alma", "Alonso", "Ana", "Andrés", "Antonia", "Araceli", "Benito", "Camila", "Carlos",
      "Carmen", "César", "Clara", "Consuelo", "Cristian", "Dolores", "Eduardo", "Elena", "Emiliano", "Esperanza",
      "Fabián", "Fernanda", "Francisco", "Gabriela", "Gerardo", "Graciela", "Guadalupe", "Guillermo", "Ignacio", "Inés",
      "Isabel", "Javier", "Jimena", "José", "Juana", "Julio", "Laura", "Leonardo", "Leticia", "Lorenzo",
      "Lucía", "Luis", "Manuel", "Margarita", "María", "Mariana", "Mario", "Marta", "Mauricio", "Mercedes",
      "Miguel", "Miriam", "Natalia", "Nicolás", "Norma", "Octavio", "Olga", "Óscar", "Paloma", "Patricia",
      "Pedro", "Ramón", "Raquel", "Ricardo", "Rosa", "Rubén", "Salvador", "Sandra", "Santiago", "Silvia",
      "Simón", "Soledad", "Susana", "Tomás", "Valentina", "Vicente", "Victoria", "Ximena", "Yolanda", "Zaira",
      "Zoe", "Adriana", "Fernando", "Verónica", "Diego", "Alejandra", "Roberto", "Ana Laura", "Ernesto", "Luisa", "Alessandro", "Alice", "Alfredo", "Allegra", "Amadeo", "Angelina", "Antonio", "Arianna", "Arturo", "Aurora",
      "Beatrice", "Bianca", "Carlo", "Carlotta", "Caterina", "Cesare", "Chiara", "Ciro", "Clara", "Cristina",
      "Dante", "Dario", "Domenico", "Elena", "Elisa", "Elio", "Elsa", "Emilia", "Enrico", "Enzo",
      "Fabio", "Federico", "Fiorella", "Francesca", "Franco", "Gabriele", "Giacomo", "Giada", "Giancarlo", "Giorgia",
      "Giovanni", "Giulia", "Giulio", "Grazia", "Guido", "Irene", "Isabella", "Jacopo", "Laura", "Leonardo",
      "Letizia", "Liliana", "Lorenzo", "Luca", "Lucia", "Ludovico", "Luigi", "Maddalena", "Marco", "Margherita",
      "Maria", "Marina", "Marino", "Mario", "Martina", "Massimo", "Matteo", "Michela", "Mirco", "Monica",
      "Nadia", "Napoleone", "Natalia", "Nicola", "Nicoletta", "Orlando", "Ottavio", "Paola", "Pasquale", "Patrizia",
      "Pietro", "Raffaele", "Renata", "Renzo", "Roberta", "Roberto", "Rosa", "Salvatore", "Serena", "Silvio",
      "Simona", "Stefania", "Tommaso", "Umberto", "Valentina", "Valerio", "Vincenzo", "Virginia", "Vittorio", "Ylenia"
   ];

   static lastNames = [
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Lopez",
      "Wilson", "Anderson", "Thomas", "Taylor", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White",
      "Lee", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen",
      "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez",
      "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins",
      "Ivanenko", "Petrenko", "Shevchenko", "Kovalenko", "Bondarenko", "Tkachenko", "Kravchenko", "Kovalchuk", "Ponomarenko", "Melnychuk",
      "Boyko", "Tkachuk", "Kucher", "Oliynyk", "Moroz", "Holub", "Mykhailenko", "Ponomariv", "Zhytomyrskyi", "Symonenko",
      "Hrytsiuk", "Onyshchenko", "Lysenko", "Korol", "Kostiuk", "Volkov", "Vasylenko", "Zakharchenko", "Andriychuk", "Riabovol",
      "Tymoshenko", "Soroka", "Kozak", "Yarmolenko", "Tereshchenko", "Marchenko", "Polishchuk", "Kozlovskyi", "Savchenko", "Symchuk",
      "Ryabov", "Sydorenko", "Klymenko", "Dovzhenko", "Pavlenko", "Vakulenko", "Zahorodniy", "Hryhorenko", "Semenenko", "Antonenko",
      "Semeniuk", "Dmytruk", "Vovk", "Bodnar", "Shcherbak", "Shtepa", "Holubov", "Kyrylenko", "Yefremov", "Hrynevych",
      "Zayats", "Prokopenko", "Yermolenko", "Serhiyenko", "Vovchenko", "Kuznetsov", "Melnyk", "Yaroshenko", "Chernenko", "Maksymenko",
      "Protsenko", "Pashchenko", "Kravets", "Bohdanovych", "Polischuk", "Lysak", "Morozov", "Holovko", "Skrypnyk", "Melnychenko",
      "Shapoval", "Yatsenko", "Chumak", "Kostyuk", "Hryhorchuk", "Kryvosheia", "Bondar", "Bilous", "Yaroslavskyi", "Martseniuk",
      "Mykolaichuk", "Zadorozhnyi", "Petruk", "Savenko", "Mykytenko", "Kolisnyk", "Hordiychuk", "Hladun", "Mishchenko", "Romanenko"
   ];

   constructor() {
      this.usedEmails = new Set();
   }

   async seedDatabase() {
      try {
         const positionCount = await positionService.getPositionCount();
         if (positionCount === 0) {
            const positions = [
               { name: 'Software Engineer', },
               { name: 'Product Manager' },
               { name: 'Sales Manager' },
               { name: 'Human Ressources' },
            ];

            const insertQuery = `
               INSERT INTO positions (name)
                  VALUES ($1)
               `;

            try {
               for (const position of positions) {
                  await db.query(insertQuery, [position.name]);
               }
               console.log('Positions added successfully.');
            } catch (err) {
               console.error('Error adding positions:', err.stack);
               throw error
            }
         }

         for (let i = 0; i < 45; i++) {
            const name = this.generateRandomName();
            const email = this.generateUniqueEmail(name);
            const phone = this.generateRandomPhone();
            const position_id = this.generateRandomPositionId(positionCount);
            const photo = this.generateRandomAvatar();
            const registration_timestamp = this.generateRandomPastDate();

            const query = `
               INSERT INTO users (name, email, phone, position_id, registration_timestamp, photo)
               VALUES ($1, $2, $3, $4, $5, $6);
            `;

            const values = [name, email, phone, position_id, registration_timestamp, photo];

            await db.query(query, values);
         }

         console.log('Database seeded successfully');
      } catch (err) {
         console.error('Error seeding database:', err);
      }
   }

   generateRandomName() {
      const firstName = SeederService.firstNames[Math.floor(Math.random() * SeederService.firstNames.length)];
      const lastName = SeederService.lastNames[Math.floor(Math.random() * SeederService.lastNames.length)];
      return `${firstName} ${lastName}`;
   }

   async generateUniqueEmail(name) {
      const domains = [
         "example.com", "mail.com", "test.com", "company.com", "website.com",
         "domain.com", "business.com", "email.com", "server.com", "hosting.com",
         "tech.com", "online.com", "network.com", "web.com", "info.com",
         "support.com", "service.com", "system.com", "solution.com", "consulting.com"
      ];

      const emailBase = name.toLowerCase().replace(/[^a-zA-Z0-9._-]/g, "")
      let email = `${emailBase}@${domains[Math.floor(Math.random() * domains.length)]}`;

      let attemptCount = 0;
      const maxAttempts = 50;

      while (this.usedEmails.has(email) && attemptCount < maxAttempts) {
         attemptCount++;
         email = `${emailBase}${attemptCount}${Math.floor(Math.random() * 10000)}@${domains[Math.floor(Math.random() * domains.length)]}`;
      }

      if (attemptCount === maxAttempts) {
         console.warn(`Failed to generate unique email for user: ${name} after ${maxAttempts} attempts.`);
         return null;
      }

      this.usedEmails.add(email);
      return email;
   }

   generateRandomPhone() {
      return '+380' + Math.floor(100000000 + Math.random() * 900000000).toString();
   }

   generateRandomPositionId(positionCount) {
      return Math.floor(Math.random() * positionCount) + 1;
   }

   generateRandomAvatar() {
      return `https://i.pravatar.cc/70?img=${Math.floor(Math.random() * 70)}`
   }

   generateRandomPastDate() {
      const start = new Date(2015, 0, 1);
      const end = new Date();
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
   }
}

module.exports = new SeederService()

