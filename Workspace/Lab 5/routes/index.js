const constructorMethod = (router) => {
  router.get("/about", async (req, res) => {
    try {
      const aboutMe = {
          "name": "Brandon Patton",
          "cwid": "10422652",
          "biography": "My name is Brandon Patton and I am currently a junior Computer Science student at Stevens.\nI enjoy listening to music and playing videogames with friends",
          "favoriteShows": ["Attack on Titan", "Curb Your Enthusiam", "Jojo's Bizarre Adventure"],
          "hobbies": ["Music", "Super Smash Bros. Melee", "Philosophizing"],
      }
      res.json(aboutMe);
    } catch (e) {
      res.status(404).json({ message: "Post not found" }); 
    }
  });

  router.get("/education", async (req, res) => {
    try {
      const hillside = {
        "schoolName": "Hillside Elementary School",
        "degree": "Elementary School Graduate",
        "favoriteClass": "Science",
        "favoriteMemory": "Walking from school to my friends house and going on his trampoline"
      }
      const middle = {
        "schoolName": "Heritage Middle School",
        "degree": "Middle School Graduate",
        "favoriteClass": "Social Studies",
        "favoriteMemory": "We had a project where we could choose from a list what kind of project we wanted to do and specific people were picked for the debate project which was exclusive, and my teacher approached me and told me she thought I would be great on it."
      }
      const high = {
        "schoolName": "Livingston High School",
        "degree": "High School Diploma",
        "favoriteClass": "Italian",
        "favoriteMemory": "Finding out how many of my friends were in my freshman gym class and how fun it was."
      }
      var education = [hillside, middle, high];
      res.json(education);
    } catch (e) {
      res.status(404).json({ message: "Post not found" }); 
    }
  });

  router.get("/story", async (req, res) => {
    try {
      const story = {
          "storyTitle": "Bad Temper",
          "story": "There once was a little boy who had a bad temper. His father gave him a bag of nails and told him that every time he lost his temper, he must hammer a nail into the back of the fence.\nThe first day, the boy had driven 37 nails into the fence. Over the next few weeks, as he learned to control his anger, the number of nails hammered daily gradually dwindled down. He discovered it was easier to hold his temper than to drive those nails into the fence.\nFinally the day came when the boy didn't lose his temper at all. He told his father about it and the father suggested that the boy now pull out one nail for each day that he was able to hold his temper. The days passed and the boy was finally able to tell his father that all the nails were gone.\nThe father took his son by the hand and led him to the fence. He said, 'You have done well, my son, but look at the holes in the fence. The fence will never be the same. When you say things in anger, they leave a scar just like this one. You can put a knife in a man and draw it out. It won't matter how many times you say I'm sorry. The wound is still there.'"
      }
    res.json(story);
    } catch (e) {
      res.status(404).json({ message: "Post not found" }); 
    }
  });
}

module.exports = constructorMethod;