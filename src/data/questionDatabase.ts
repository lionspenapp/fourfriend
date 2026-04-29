/**
 * Full question database extracted from the Lion's Pen PDFs.
 * Each category has 60 prompts: IDs 001-020 (grades 3-4), 021-040 (grades 5-6), 041-060 (grades 7-8).
 * Organized by week (1-4) and day (1-5) within each grade band.
 */

export interface QuestionEntry {
  id: string;
  week: number;
  day: number;
  prompt: string;
  gradeRange: "3-4" | "5-6" | "7-8";
}

export type QuestionCategory = "academic" | "emotion" | "character";

// ────────────────────────────────────────────
// ACADEMIC DATABASE
// ────────────────────────────────────────────
export const ACADEMIC_QUESTIONS: QuestionEntry[] = [
  // Grades 3-4
  { id: "A001", week: 1, day: 1, gradeRange: "3-4", prompt: "Think about a subject in school that feels very easy for you, like you could do it with your eyes closed. Tell me what your brain does when you are waiting for the rest of the class to finish. Do you draw in your notebook, make up stories, or just daydream? If you could change the lesson to make it more exciting for yourself, what would you add to it?" },
  { id: "A002", week: 1, day: 2, gradeRange: "3-4", prompt: "Think of a \"small win\" you had this week. It doesn't have to be a perfect grade—maybe you finally remembered a hard spelling word or helped a friend. Describe exactly what happened from the beginning to the end. How did your heart and your head feel when you realized you did it?" },
  { id: "A003", week: 1, day: 3, gradeRange: "3-4", prompt: "When your teacher says, \"Okay, everyone, start your work,\" walk me through what you do. Do you open your book right away, or do you need to sharpen your pencil and talk to a neighbor first? Describe why it is sometimes hard to get your brain moving on a new task." },
  { id: "A004", week: 1, day: 4, gradeRange: "3-4", prompt: "Imagine you are working on a page and you get completely stuck. You don't know what the next step is. Who is the first person you look for, and how do you ask them for help? Write about what a \"good helper\" does that makes you feel brave enough to keep trying." },
  { id: "A005", week: 1, day: 5, gradeRange: "3-4", prompt: "Think of something you learned recently that felt like a \"brain-knot\" at first. Then, suddenly, it made sense! Describe what that \"click\" felt like. What was the one thing the teacher said or the one thing you did that finally untied the knot?" },
  { id: "A006", week: 2, day: 1, gradeRange: "3-4", prompt: "If you were an explorer in your classroom, where would be your favorite place to \"set up camp\" and work? Describe this spot using your five senses. What do you see, hear, and feel when you are sitting there? Why does that spot help you do your best thinking?" },
  { id: "A007", week: 2, day: 2, gradeRange: "3-4", prompt: "Some kids like working like a \"lone wolf,\" and some like being in a \"pack.\" Describe a time you worked with a partner or a group. What was the best part about having help, and what was the hardest part about sharing your ideas with others?" },
  { id: "A008", week: 2, day: 3, gradeRange: "3-4", prompt: "Everyone makes mistakes, but sometimes they feel big. Describe a time you messed up on a paper or an activity. Instead of getting upset, how did you fix it? What is one thing you learned from that mistake that you wouldn't have learned if you got it right the first time?" },
  { id: "A009", week: 2, day: 4, gradeRange: "3-4", prompt: "Imagine a new student joined your class today. How would you explain to them that this is a place where they belong? Write about the things your teacher or your classmates do that make you feel like you are a special part of the team." },
  { id: "A010", week: 2, day: 5, gradeRange: "3-4", prompt: "Think of your brain like a battery. Some mornings it is at 100%, and some mornings it is at 10%. Describe how your \"brain battery\" feels today. What are some things that \"charge\" you up (like recess or reading) and what are things that \"drain\" your power?" },
  { id: "A011", week: 3, day: 1, gradeRange: "3-4", prompt: "When you pick up a book to read by yourself, how do you decide if it's the \"right\" one? Describe what you do when you hit a word you've never seen before. Do you try to sound it out, skip it, or look at the pictures for a clue? Tell me about a time a book really pulled you into the story." },
  { id: "A012", week: 3, day: 2, gradeRange: "3-4", prompt: "When you have to write a long story, what does it feel like when you look at a blank white page? Is it exciting like a new adventure, or a little scary? Describe how you come up with your very first sentence and how you decide what happens next." },
  { id: "A013", week: 3, day: 3, gradeRange: "3-4", prompt: "Think about a time the teacher was giving directions but your mind went on a little \"vacation.\" Where did your mind go? Describe what helps you \"pull your brain back\" to the classroom so you can hear the instructions clearly." },
  { id: "A014", week: 3, day: 4, gradeRange: "3-4", prompt: "If you could write a book about anything in the world, what would it be about? Describe the characters, where they live, and the big problem they have to solve. Why is this a story that you think other 3rd or 4th graders would love to read?" },
  { id: "A015", week: 3, day: 5, gradeRange: "3-4", prompt: "Think of a \"fancy\" or \"grown-up\" word you learned recently. What is the word, and what does it mean to you? Write a few sentences using that word to show off how much your \"word-bank\" is growing." },
  { id: "A016", week: 4, day: 1, gradeRange: "3-4", prompt: "If you could fast-forward to the end of this school year, what is one thing you want to be \"famous\" for in your classroom? Maybe you want to be the best at multiplication or the kindest friend. Describe what you need to do every day to make that happen." },
  { id: "A017", week: 4, day: 2, gradeRange: "3-4", prompt: "Describe the inside of your desk or your backpack right now. Is it neat and tidy, or is it a \"treasure chest\" full of old papers and pencils? Tell me one small habit you could start today to help you find your supplies faster." },
  { id: "A018", week: 4, day: 3, gradeRange: "3-4", prompt: "Sometimes math feels like climbing a steep mountain. Describe a type of math problem that makes you feel a little nervous. What goes through your head when you see those numbers? Now, describe a type of math that feels like walking on a flat path because you are so good at it." },
  { id: "A019", week: 4, day: 4, gradeRange: "3-4", prompt: "Everyone has a \"worry cloud\" that follows them sometimes. What is one thing about school that makes you feel a little bit worried or shy? If you could talk to that worry cloud, what would you say to make it go away so you can feel brave?" },
  { id: "A020", week: 4, day: 5, gradeRange: "3-4", prompt: "Walk me through what happens when you get home and it's time to do schoolwork. Where do you sit? Is it noisy or quiet? Describe your perfect \"homework kingdom\" where you could get all your work done without any distractions." },

  // Grades 5-6
  { id: "A021", week: 1, day: 1, gradeRange: "5-6", prompt: "Identify a subject or specific topic that currently feels \"too easy\" for you. Describe the internal experience of being in that class—do you feel a sense of boredom, or do you find yourself zoning out? If you were the teacher, how would you change the assignment to make it more challenging for someone with your skills?" },
  { id: "A022", week: 1, day: 2, gradeRange: "5-6", prompt: "Reflect on a recent \"academic win\" that didn't necessarily involve a grade. This could be finally understanding a difficult concept or participating in a discussion you usually avoid. Describe the steps you took to achieve this. What does this success tell you about your ability to handle difficult tasks in the future?" },
  { id: "A023", week: 1, day: 3, gradeRange: "5-6", prompt: "Think about your most recent block of independent work time. Describe your \"startup process\"—did you begin immediately, or did you find ways to stall? Identify the biggest distraction in your environment and explain how it affects your momentum. What would a \"perfect\" work session look like for you?" },
  { id: "A024", week: 1, day: 4, gradeRange: "5-6", prompt: "When you encounter a \"roadblock\" in your learning, what is your internal dialogue? Describe the difference between how you feel when you ask a peer for help versus asking a teacher. Why is it sometimes difficult to admit you are stuck, and what makes a specific adult feel \"safe\" to ask?" },
  { id: "A025", week: 1, day: 5, gradeRange: "5-6", prompt: "Describe a time recently when a concept went from being \"confusing\" to \"clear.\" What was the specific moment it clicked? Analyze whether it was a visual aid, a specific explanation, or your own practice that made the difference. How can you use that same method the next time you feel lost?" },
  { id: "A026", week: 2, day: 1, gradeRange: "5-6", prompt: "Evaluate your current classroom seating and environment. Describe how the physical space around you (noise level, lighting, or the people sitting nearby) impacts your ability to process information. If you could design a \"study zone\" specifically for your brain's needs, what would it look like?" },
  { id: "A027", week: 2, day: 2, gradeRange: "5-6", prompt: "Reflect on a recent group project or partner activity. Describe your role within that team—are you the leader, the researcher, the peacemaker, or the quiet observer? Discuss the challenges of balancing your own ideas with the ideas of others and how you handle disagreements." },
  { id: "A028", week: 2, day: 3, gradeRange: "5-6", prompt: "Think about a significant mistake you made on a recent assignment. Instead of focusing on the error, analyze the reason behind it. Was it a lack of understanding, a rush to finish, or a \"mirror mistake\" where you saw what you expected to see? How did your reaction to this mistake change your approach to the next task?" },
  { id: "A029", week: 2, day: 4, gradeRange: "5-6", prompt: "What does it mean to \"belong\" in a classroom? Describe the specific actions, words, or habits from your teachers or peers that make you feel like your voice is valued. Conversely, what is one thing that happens in school that makes you feel like you have to hide your true self?" },
  { id: "A030", week: 2, day: 5, gradeRange: "5-6", prompt: "We often talk about \"time management,\" but \"energy management\" is just as important. Describe the parts of the school day that drain your mental energy and the parts that recharge it. How does your ability to learn change when your \"mental battery\" is low in the afternoon?" },
  { id: "A031", week: 3, day: 1, gradeRange: "5-6", prompt: "When you are reading a complex text, what does the \"voice in your head\" do when you hit a difficult paragraph? Describe the strategies you use to maintain stamina when a book gets slow. Do you visualize the scene, or do you focus on the logic of the information?" },
  { id: "A032", week: 3, day: 2, gradeRange: "5-6", prompt: "Writing is often described as \"thinking on paper.\" Describe your process for moving from a blank page to a finished paragraph. Which part of the process—brainstorming, drafting, or revising—feels the most frustrating, and why? How do you know when a piece of writing is \"good enough\"?" },
  { id: "A033", week: 3, day: 3, gradeRange: "5-6", prompt: "Reflect on a time during a lecture or presentation when you realized you had stopped listening. What triggered that \"mental exit\"? Describe the physical or mental cues you use to bring your attention back to the speaker and why active listening is harder in some subjects than others." },
  { id: "A034", week: 3, day: 4, gradeRange: "5-6", prompt: "If you were asked to write a story that taught a younger student a lesson about \"grit\" or \"humility,\" what would the plot be? Describe the protagonist's struggle and how they eventually overcome it. Why did you choose this specific lesson to share?" },
  { id: "A035", week: 3, day: 5, gradeRange: "5-6", prompt: "Choose a complex word you've encountered in your studies recently. Explain why this word is more \"precise\" than a simpler version (for example, using metacognition instead of thinking). How does having a bigger vocabulary change the way you describe your own life?" },
  { id: "A036", week: 4, day: 1, gradeRange: "5-6", prompt: "Think about where you want to be at the end of this semester. Beyond grades, what is a specific skill you want to master? Describe the \"small habits\" you would need to practice every day to reach that goal. What is the biggest obstacle standing in your way?" },
  { id: "A037", week: 4, day: 2, gradeRange: "5-6", prompt: "Describe your current system for keeping track of assignments and materials. Is your system \"reactive\" (fixing things when they get messy) or \"proactive\" (preventing the mess)? If your teacher asked you to find a handout from three weeks ago, walk me through the steps you would take to find it." },
  { id: "A038", week: 4, day: 3, gradeRange: "5-6", prompt: "Many students experience \"math anxiety\" or \"math confidence.\" Describe your physical and mental reaction when you see a problem you don't immediately know how to solve. Does your brain \"freeze,\" or do you start looking for patterns? Compare this to a subject where you feel completely in control." },
  { id: "A039", week: 4, day: 4, gradeRange: "5-6", prompt: "Everyone carries a \"worry cloud\" regarding school, whether it's about social status, grades, or the future. Describe what is inside your current worry cloud. If you were giving advice to a friend with the same worry, what logical steps would you tell them to take to shrink that cloud?" },
  { id: "A040", week: 4, day: 5, gradeRange: "5-6", prompt: "Describe your \"homework ecosystem\" at home. Who is there, what is the noise level, and what time of day does it happen? Analyze one part of this routine that is currently working well and one part that causes unnecessary stress. What is one change you could make tonight to improve it?" },

  // Grades 7-8
  { id: "A041", week: 1, day: 1, gradeRange: "7-8", prompt: "Identify a subject where you find it difficult to remain mentally present. Beyond just saying it is \"boring,\" analyze the specific cause: is it the pace, the delivery of the information, or a lack of connection to your personal goals? If you were given total control over how you learned this topic for one week, what would your plan look like?" },
  { id: "A042", week: 1, day: 2, gradeRange: "7-8", prompt: "Reflect on a recent academic challenge that required significant effort to overcome. Describe the moment you felt the most frustrated and the specific strategy you used to push through it. How did your perception of your own intelligence change after you succeeded?" },
  { id: "A043", week: 1, day: 3, gradeRange: "7-8", prompt: "Analyze your \"startup friction\"—the time between being given a task and actually beginning deep work. What are the specific internal or external \"hooks\" that pull your attention away? Describe a system you could implement to reduce this friction and get into a \"flow state\" more quickly." },
  { id: "A044", week: 1, day: 4, gradeRange: "7-8", prompt: "Describe a time you didn't understand a concept but chose not to ask for clarification. What was the social or internal pressure that stopped you? Explain the difference between \"performative learning\" (looking like you know the answer) and \"authentic learning\" (admitting the gap)." },
  { id: "A045", week: 1, day: 5, gradeRange: "7-8", prompt: "Select a complex idea you recently mastered. Compare your understanding of it before and after it \"clicked.\" How did your brain reorganize the information? What does this process tell you about the way you specifically need to receive information to make it stick?" },
  { id: "A046", week: 2, day: 1, gradeRange: "7-8", prompt: "Evaluate how the \"social climate\" of your classroom affects your academic performance. Do you find yourself performing differently depending on who you are sitting near? Describe the tension between wanting to be socially accepted and wanting to be academically successful." },
  { id: "A047", week: 2, day: 2, gradeRange: "7-8", prompt: "Reflect on a time a group project didn't go as planned. Instead of blaming others, analyze the communication breakdown. What role did you play in the group's dynamic, and what is one thing you would do differently to ensure a more equitable \"division of labor\" next time?" },
  { id: "A048", week: 2, day: 3, gradeRange: "7-8", prompt: "Analyze a recent \"failure\" or setback. Was it a \"stretch mistake\" (trying something new), a \"slips mistake\" (a careless error), or a \"lack of foundation\" (missing the basic steps)? How does categorizing the mistake change how you feel about your own potential?" },
  { id: "A049", week: 2, day: 4, gradeRange: "7-8", prompt: "In middle school, many students feel they have to \"mask\" certain parts of themselves to fit in. Describe a situation at school where you felt you couldn't be your authentic self. What would need to change in the classroom culture for you to feel 100% comfortable sharing your true thoughts?" },
  { id: "A050", week: 2, day: 5, gradeRange: "7-8", prompt: "Think of a time you were \"certain\" about an answer or an opinion, only to be proven wrong. Describe the physical sensation of being corrected. Why is the ability to change your mind—humility—actually a sign of a high-level thinker?" },
  { id: "A051", week: 3, day: 1, gradeRange: "7-8", prompt: "As texts get longer and more complex, where does your focus usually begin to flicker? Describe the mental \"checkpoints\" you use to ensure you are actually comprehending what you read rather than just moving your eyes across the page." },
  { id: "A052", week: 3, day: 2, gradeRange: "7-8", prompt: "Describe your relationship with the \"revision\" process. Do you view it as \"fixing mistakes\" or \"sharpening an argument\"? Explain how you decide which ideas to keep and which to cut when you are trying to make a piece of writing more powerful and concise." },
  { id: "A053", week: 3, day: 3, gradeRange: "7-8", prompt: "We often tell ourselves \"stories\" about our abilities (e.g., \"I'm just not a math person\"). Identify one negative story you tell yourself about your academic skills. Where did this story come from, and what evidence can you find to prove it is actually false?" },
  { id: "A054", week: 3, day: 4, gradeRange: "7-8", prompt: "Think about the information you consume outside of school (YouTube, TikTok, news). How has this shaped the way you think about a specific school subject? Describe a time you brought \"outside knowledge\" into a classroom discussion and how it changed the conversation." },
  { id: "A055", week: 3, day: 5, gradeRange: "7-8", prompt: "Why does it matter if we use the \"exact\" right word in a discussion? Pick a term from your current studies (e.g., systemic, metacognition, proactive) and explain how using that specific word allows for a deeper level of thinking than a simpler synonym." },
  { id: "A056", week: 4, day: 1, gradeRange: "7-8", prompt: "If you could send a message to your \"future self\" five years from now, what academic habit would you hope you have mastered by then? Describe the version of you that is in 12th grade—how do they handle stress, and what steps are you taking today to become that person?" },
  { id: "A057", week: 4, day: 2, gradeRange: "7-8", prompt: "Every professional has a \"workflow.\" Describe yours. From the moment an assignment is given to the moment it is turned in, walk me through your system of organization. Identify the one \"weak link\" in this chain and how it could be reinforced." },
  { id: "A058", week: 4, day: 3, gradeRange: "7-8", prompt: "Describe the difference between \"good stress\" (motivation) and \"bad stress\" (anxiety). When you are facing a high-stakes exam or presentation, what specific physical or mental \"grounding\" techniques do you use to stay in control of your performance?" },
  { id: "A059", week: 4, day: 4, gradeRange: "7-8", prompt: "Many people set goals but few create \"systems\" to reach them. Identify one major goal you have for the next month. Instead of focusing on the result, describe the daily routine you will follow to ensure that result is inevitable." },
  { id: "A060", week: 4, day: 5, gradeRange: "7-8", prompt: "Reflect on your life outside of school—sleep, nutrition, hobbies, and family. How do these factors act as the \"foundation\" for your school day? Describe one small change you could make to your \"after-school ecosystem\" that would make your mornings significantly more productive." },
];

// ────────────────────────────────────────────
// EMOTION DATABASE
// ────────────────────────────────────────────
export const EMOTION_QUESTIONS: QuestionEntry[] = [
  // Grades 3-4
  { id: "E001", week: 1, day: 1, gradeRange: "3-4", prompt: "If you were a weather reporter today, what would the headline be? Is your day \"Sunny and Bright,\" \"A Little Cloudy,\" or maybe \"A Fast-Moving Storm\"? Describe the \"temperature\" of your thoughts right now." },
  { id: "E002", week: 1, day: 2, gradeRange: "3-4", prompt: "Was there anything today—big or small—that gave you a \"spark\" of excitement? Maybe it was a plan with a friend or a fun snack. What was it, and why did it make you smile?" },
  { id: "E003", week: 1, day: 3, gradeRange: "3-4", prompt: "Think of your friends like a giant power grid. Which friend made your \"battery\" feel full today by being kind or funny? Did anyone accidentally make your battery feel a little drained?" },
  { id: "E004", week: 1, day: 4, gradeRange: "3-4", prompt: "Did something happen today that left a heavy feeling in your chest, even if it seemed like a small thing? What did your body feel like? Did you go quiet, or did your stomach feel tight?" },
  { id: "E005", week: 1, day: 5, gradeRange: "3-4", prompt: "If you look through a \"telescope\" at tomorrow, what is one tiny thing you are looking forward to? What is one \"bright spot\" on your calendar for the rest of the week?" },
  { id: "E006", week: 2, day: 1, gradeRange: "3-4", prompt: "When it rains, an umbrella keeps you dry. In a group of friends, an \"Umbrella\" is someone who keeps things calm when there is drama. Who was an \"Umbrella\" for you today?" },
  { id: "E007", week: 2, day: 2, gradeRange: "3-4", prompt: "Did you feel like your friends or teachers really \"got\" you today? Was there a moment when someone understood how you felt without you having to explain it much?" },
  { id: "E008", week: 2, day: 3, gradeRange: "3-4", prompt: "Sometimes the world feels too loud—not just the noise, but too much going on at once. Did the \"Volume\" of the world feel too high today? Where is your \"Quiet Zone\" where you go to feel peaceful?" },
  { id: "E009", week: 2, day: 4, gradeRange: "3-4", prompt: "Did anything happen in a text, a game chat, or online that changed how you felt? Since online words stay on the screen, did they make you feel left out or happy?" },
  { id: "E010", week: 2, day: 5, gradeRange: "3-4", prompt: "Did your school building feel \"warm\" and easy to be in today, or did it feel a bit \"stuffy\" and high-pressure? Was there an adult who made you feel safe and \"grounded\"?" },
  { id: "E011", week: 3, day: 1, gradeRange: "3-4", prompt: "Every house has a \"feeling\" temperature. Does your home feel \"Warm\" like a hug, or \"Chilly\" because people are rushed or upset? What made the temperature change today?" },
  { id: "E012", week: 3, day: 2, gradeRange: "3-4", prompt: "Is there someone at home who truly knows what your life looks like at school? Who understands your friendships and how you are actually feeling day to day?" },
  { id: "E013", week: 3, day: 3, gradeRange: "3-4", prompt: "When you walked in the door at home today, did the mood help \"refuel\" your energy, or did it add to the \"weight\" you were already carrying?" },
  { id: "E014", week: 3, day: 4, gradeRange: "3-4", prompt: "Did you feel like you had a say in your day today, or were you just following everyone else's rules? What was one choice you made today that made you feel good?" },
  { id: "E015", week: 3, day: 5, gradeRange: "3-4", prompt: "Sometimes something unexpected happens and your plan \"crashes\" like a computer program. Tell about a moment this week where you had a \"glitch\" and how you tried to \"restart.\"" },
  { id: "E016", week: 4, day: 1, gradeRange: "3-4", prompt: "A \"Spotlight\" is a warm beam of light that makes you feel big, confident, and proud. Describe a moment this week when you felt like you were standing in the bright light." },
  { id: "E017", week: 4, day: 2, gradeRange: "3-4", prompt: "A \"Shadow\" is a quiet corner where you feel small, shy, or invisible. When did a shadow show up this week? Was it during a loud lunch or a hard lesson?" },
  { id: "E018", week: 4, day: 3, gradeRange: "3-4", prompt: "Is there a thought that has been sitting in the background of your mind all week? If you could give that worry a name, what would it be?" },
  { id: "E019", week: 4, day: 4, gradeRange: "3-4", prompt: "Was there a moment this week when you saw something not working well (like a messy desk or a boring game) and you decided to fix it? How did it feel to lead by example?" },
  { id: "E020", week: 4, day: 5, gradeRange: "3-4", prompt: "Did you say or do something today that is still \"sitting with you\" because it might have hurt someone else? If you could go back and do that moment differently, what would you do?" },

  // Grades 5-6
  { id: "E021", week: 1, day: 1, gradeRange: "5-6", prompt: "If today were a weather report, what would the headline be? Beyond just \"sunny\" or \"cloudy,\" describe the specific pressure and \"climate\" of your thoughts so far." },
  { id: "E022", week: 1, day: 2, gradeRange: "5-6", prompt: "Was there a moment today—big or small—that gave you a genuine spark of excitement or a plan forming that made you think, \"That could be really cool\"?" },
  { id: "E023", week: 1, day: 3, gradeRange: "5-6", prompt: "Did something today leave a heavy feeling in your chest, even if it's something you feel you \"shouldn't\" be upset about? Describe how your body reacted (e.g., tight throat, quietness, or stomach tension)." },
  { id: "E024", week: 1, day: 4, gradeRange: "5-6", prompt: "If you look through a telescope at the rest of this week, what is one \"bright spot\" on your calendar? If today was cloudy, what is one thing you can do differently tomorrow to help the sun come out?" },
  { id: "E025", week: 1, day: 5, gradeRange: "5-6", prompt: "Is today a \"high-energy\" or \"low-energy\" day? Are things you usually love doing still interesting to you today, or do you feel like you'd rather be alone and quiet?" },
  { id: "E026", week: 2, day: 1, gradeRange: "5-6", prompt: "Think about your friends like a giant power grid. Which friend \"charged\" your battery today by being kind or funny, and was there anyone who accidentally made you feel \"drained\"?" },
  { id: "E027", week: 2, day: 2, gradeRange: "5-6", prompt: "In a group, an \"Umbrella\" is someone who keeps things calm and safe when there is drama. Who was the \"Umbrella\" in your group today, and how did they keep the \"rain\" off the group?" },
  { id: "E028", week: 2, day: 3, gradeRange: "5-6", prompt: "At any point today, did the \"Volume\" of the world (noise, crowds, or energy) feel like it was turned up to 100? What was your \"Quiet Zone\" to turn it back down?" },
  { id: "E029", week: 2, day: 4, gradeRange: "5-6", prompt: "Did anything happen today in a text, group chat, or on social media that landed hard? Describe the digital moment—whether it made you feel stung or connected—and how it felt in your body." },
  { id: "E030", week: 2, day: 5, gradeRange: "5-6", prompt: "Did you feel like you could be exactly who you are today, or did you feel like you had to \"hide\" a part of yourself to fit in? Who made you feel the most connected and safe?" },
  { id: "E031", week: 3, day: 1, gradeRange: "5-6", prompt: "Did you feel like you had a say in how your day went, or were you just following everyone else's rules? What was one choice you made today that you felt good about?" },
  { id: "E032", week: 3, day: 2, gradeRange: "5-6", prompt: "Describe the atmosphere of your school today. Did it feel relaxed and supportive, or high-pressure and \"stuffy\"? Was there a specific adult who made you feel \"grounded\"?" },
  { id: "E033", week: 3, day: 3, gradeRange: "5-6", prompt: "Describe the atmosphere when you walked in the door at home today. Was it a place that refueled you, or did you feel you had to manage your own feelings carefully so things didn't get harder?" },
  { id: "E034", week: 3, day: 4, gradeRange: "5-6", prompt: "Being loved and being \"known\" are different. Is there someone at home who genuinely understands what your days are like—your school life, your friendships, and how you actually feel?" },
  { id: "E035", week: 3, day: 5, gradeRange: "5-6", prompt: "Was there a moment this week when you saw something not working (a messy space or a disagreement) and used your own \"tools\" or creative ideas to fix it?" },
  { id: "E036", week: 4, day: 1, gradeRange: "5-6", prompt: "Your day is like a computer program. Describe a moment this week when a plan \"crashed\" or your brain felt \"frozen.\" How did you try to \"restart\" or fix the error?" },
  { id: "E037", week: 4, day: 2, gradeRange: "5-6", prompt: "Describe a \"Spotlight\" moment this week where you felt \"big\" and confident—like you were standing in a warm, golden beam. How did that \"warmth\" feel in your chest?" },
  { id: "E038", week: 4, day: 3, gradeRange: "5-6", prompt: "Describe a \"Shadow\" moment where you felt small, shy, or invisible. Why do you think that shadow showed up—a mistake, something someone said, or just a quiet feeling?" },
  { id: "E039", week: 4, day: 4, gradeRange: "5-6", prompt: "Do you have a quiet, nervous feeling in the back of your mind today that you can't quite explain? Is it about school, home, or just a general \"restless\" feeling?" },
  { id: "E040", week: 4, day: 5, gradeRange: "5-6", prompt: "Did you say or do something today that is still \"sitting with you\" because of how it affected someone else? If you could go back and do that moment differently, what would you do?" },

  // Grades 7-8
  { id: "E041", week: 1, day: 1, gradeRange: "7-8", prompt: "If today were a weather report, what would the headline be? Beyond a simple observation, describe the specific \"pressure,\" light, and temperature of your mental experience so far." },
  { id: "E042", week: 1, day: 2, gradeRange: "7-8", prompt: "Was there a moment today—big or small—that gave you a spark of genuine excitement? What was it, and why does it feel significant to you right now?" },
  { id: "E043", week: 1, day: 3, gradeRange: "7-8", prompt: "Is there anything on your mind this week that feels \"hard to carry\" or move past? How do these \"what-if\" thoughts change how your body feels, specifically in your shoulders or stomach?" },
  { id: "E044", week: 1, day: 4, gradeRange: "7-8", prompt: "Does today feel like a \"high-energy\" day or a \"low-energy\" day? When you are around friends or family, do you feel like joining in, or do you feel a need to be alone and quiet?" },
  { id: "E045", week: 1, day: 5, gradeRange: "7-8", prompt: "If you look through a telescope at tomorrow, what is one \"bright spot\" on your calendar? If today was cloudy, what is one goal or \"win\" you want to try for tomorrow to change the weather?" },
  { id: "E046", week: 2, day: 1, gradeRange: "7-8", prompt: "Think of your social circle as a giant power grid. Which friend \"charged\" your battery today, and was there anyone who accidentally made it feel drained? Explain what they did to change your energy level." },
  { id: "E047", week: 2, day: 2, gradeRange: "7-8", prompt: "An \"Umbrella\" is someone who keeps things calm and makes others feel safe when there is \"drama\". Who acted as the Umbrella in your group today, and how did they keep the \"rain\" off the group?" },
  { id: "E048", week: 2, day: 3, gradeRange: "7-8", prompt: "Sometimes the world feels too loud—not just noise, but the energy and crowds. Did the \"Volume\" feel like it was at 100 today? Where is your \"Quiet Zone\" to turn it back down?" },
  { id: "E049", week: 2, day: 4, gradeRange: "7-8", prompt: "Did something happen today in a text or group chat that affected your mood—something no one in the room with you would have known about? How did it land in your body?" },
  { id: "E050", week: 2, day: 5, gradeRange: "7-8", prompt: "Being loved and being \"known\" are different. Is there someone at home who genuinely understands what your days are like, your school life, and your friendships?" },
  { id: "E051", week: 3, day: 1, gradeRange: "7-8", prompt: "Did you feel like you had a say in how your day went today, or were you just following everyone else's rules? What would you change to feel more like the \"boss\" of your own life?" },
  { id: "E052", week: 3, day: 2, gradeRange: "7-8", prompt: "Every house has a \"feeling\" temperature. Does your home feel \"Warm\" (like a hug) or \"Chilly\" (tense or quiet) right now? What changed the temperature today?" },
  { id: "E053", week: 3, day: 3, gradeRange: "7-8", prompt: "Describe the \"climate\" of your school building today. Did it feel relaxed and supportive, or high-pressure and \"stuffy\"? Was there an adult who made you feel \"grounded\"?" },
  { id: "E054", week: 3, day: 4, gradeRange: "7-8", prompt: "Did the atmosphere at home today \"refuel\" you, or did it add to the weight you were already carrying? Did you feel you had to manage yourself carefully so things didn't get harder?" },
  { id: "E055", week: 3, day: 5, gradeRange: "7-8", prompt: "Was there a moment this week when you saw something wasn't working well and decided to fix it? How did it feel to see the situation change because of your action?" },
  { id: "E056", week: 4, day: 1, gradeRange: "7-8", prompt: "Your day is like a computer program. Describe a moment this week when something unexpected caused a \"glitch\" or a \"crash\". How did you try to \"restart\"?" },
  { id: "E057", week: 4, day: 2, gradeRange: "7-8", prompt: "Describe a \"Spotlight\" moment this week where you felt \"big\" and confident. How did it feel to be \"seen\" by others, and where did you feel that \"warmth\"?" },
  { id: "E058", week: 4, day: 3, gradeRange: "7-8", prompt: "Describe a \"Shadow\" moment where you felt small or invisible. Why do you think that shadow showed up—was it a mistake, or just a quiet feeling you can't name?" },
  { id: "E059", week: 4, day: 4, gradeRange: "7-8", prompt: "Do you have a nervous feeling in the back of your mind today that something \"isn't quite right\"? Is it about school, home, or just a general feeling you can't explain?" },
  { id: "E060", week: 4, day: 5, gradeRange: "7-8", prompt: "Did you do or say something today that is still \"sitting with you\" because of how it affected someone else? If you could go back and do that moment differently, what would you do?" },
];

// ────────────────────────────────────────────
// CHARACTER DATABASE
// ────────────────────────────────────────────
export const CHARACTER_QUESTIONS: QuestionEntry[] = [
  // Grades 3-4
  { id: "C001", week: 1, day: 1, gradeRange: "3-4", prompt: "Name one specific thing from today that you are genuinely grateful for. Instead of just naming it, describe exactly what happened and why it made your day better. What would your day have looked like if this thing hadn't happened?" },
  { id: "C002", week: 1, day: 2, gradeRange: "3-4", prompt: "Think of a moment today when something was really difficult or you got an answer wrong. What did the voice in your head say to you? Explain how saying \"I can't do this yet\" feels different than just saying \"I can't,\" and how it changed your mood." },
  { id: "C003", week: 1, day: 3, gradeRange: "3-4", prompt: "Describe a moment today where you chose to do the right thing even though no one was around to see you do it. Why did you decide to do it anyway, and how did it make you feel about yourself afterward?" },
  { id: "C004", week: 1, day: 4, gradeRange: "3-4", prompt: "Pick one task you worked on today and describe why it was your \"best effort.\" Even if the result wasn't perfect, what did you do to make sure you didn't cut corners, and why was that important to you?" },
  { id: "C005", week: 1, day: 5, gradeRange: "3-4", prompt: "Tell a story about a time today when you finished a chore or schoolwork without a teacher or parent having to remind you. How did it feel to be the \"boss\" of your own tasks, and what did you do with the extra time you saved?" },
  { id: "C006", week: 2, day: 1, gradeRange: "3-4", prompt: "Describe a moment at home today where you helped a family member without being asked. What did you notice that needed to be done, and how did the other person react when they saw you helping?" },
  { id: "C007", week: 2, day: 2, gradeRange: "3-4", prompt: "Think about a time today when you felt frustrated or angry. Describe what happened in the first ten seconds after that feeling hit—did you stop and breathe, or did you react right away? What would you change if you could replay those ten seconds?" },
  { id: "C008", week: 2, day: 3, gradeRange: "3-4", prompt: "Tell about a time today when you encouraged a friend who was having a hard time. How did you notice they were sad or struggling, and what specific words did you use to help them feel a little bit better?" },
  { id: "C009", week: 2, day: 4, gradeRange: "3-4", prompt: "Describe a time today when you saw someone sitting alone or left out of a game. What was going through your mind when you saw them, and what steps did you take to make sure they felt included?" },
  { id: "C010", week: 2, day: 5, gradeRange: "3-4", prompt: "Reflect on the words you used today. Describe one thing you said that made someone feel good, and one thing you might have said that you wish you could take back. How do your words change the \"weather\" of the people around you?" },
  { id: "C011", week: 3, day: 1, gradeRange: "3-4", prompt: "Describe a moment today where you tried something hard even though you were worried about making a mistake. What did it feel like in your body to be brave, and what did you learn by trying? Write about a time this week where you saw someone being treated unfairly. Did you say something to help, or did you find an adult? Explain why it can be hard to stand up for others and what you want to do next time." },
  { id: "C012", week: 3, day: 2, gradeRange: "3-4", prompt: "Describe a situation today where it would have been very easy to tell a small lie or take a shortcut. What did that \"temptation\" promise you, and how did you feel after you made your final choice?" },
  { id: "C013", week: 3, day: 3, gradeRange: "3-4", prompt: "Tell about a task or a lesson today that made you want to give up. What was the hardest part, and what was the one thought that helped you keep going until you were finished?" },
  { id: "C014", week: 3, day: 4, gradeRange: "3-4", prompt: "Looking back at this whole week, what was the biggest challenge you faced? Describe how you handled it on Monday versus how you handle it now. What is one thing you know about yourself now that you didn't know before?" },
  { id: "C015", week: 3, day: 5, gradeRange: "3-4", prompt: "Think about the videos you watched or games you played today. Describe how your brain and body felt after using the screen—did you feel relaxed and happy, or did you feel tired and grumpy? What would you change for tomorrow?" },
  { id: "C016", week: 4, day: 1, gradeRange: "3-4", prompt: "Describe a moment today where you tried something hard even though you were worried about making a mistake. What did it feel like in your body to be brave, and what did you learn by trying?" },
  { id: "C017", week: 4, day: 2, gradeRange: "3-4", prompt: "Think about a time someone hurt your feelings recently. Forgiveness means choosing not to let that hurt stay in your heart. Describe how it feels to \"let go\" of that anger so you can feel more peaceful." },
  { id: "C018", week: 4, day: 3, gradeRange: "3-4", prompt: "If you did something that hurt someone else today, describe what happened from their point of view. What is one specific thing you can say or do tomorrow to fix the friendship and make things right?" },
  { id: "C019", week: 4, day: 4, gradeRange: "3-4", prompt: "Explain why it is important to think your own thoughts and write your own answers instead of just copying. Describe a moment today where you were proud of an answer because it came entirely from your own brain." },
  { id: "C020", week: 4, day: 5, gradeRange: "3-4", prompt: "Was there a moment today where you did something kind just because it was right, and not because you wanted a reward? Describe the difference between how it feels to get a prize and how it feels to know you did the right thing." },

  // Grades 5-6
  { id: "C021", week: 1, day: 1, gradeRange: "5-6", prompt: "Identify one specific event from today that you are grateful for. Instead of just naming it, explain the \"ripple effect\"—how did this one thing change the rest of your day, and what would have been harder without it?" },
  { id: "C022", week: 1, day: 2, gradeRange: "5-6", prompt: "When you faced a setback today, what was the exact \"voice\" in your head? Describe the moment you realized you had a choice between thinking \"I'm not good at this\" and \"I need a different strategy.\"" },
  { id: "C023", week: 1, day: 3, gradeRange: "5-6", prompt: "Describe a moment where you acted with integrity when no one was watching, and compare it to a time you acted \"better\" because an adult was nearby. What does the gap between those two moments tell you about your character?" },
  { id: "C024", week: 1, day: 4, gradeRange: "5-6", prompt: "Pick a task that actually mattered to you today. Describe the effort you brought to it. If you had cut corners, what would that have cost you in terms of your own self-respect and the final result?" },
  { id: "C025", week: 1, day: 5, gradeRange: "5-6", prompt: "Reflect on your schoolwork today. Describe a moment where you were tempted to pretend you understood something when you didn't. What is the difference between \"getting it done\" and \"actually learning it\"?" },
  { id: "C026", week: 2, day: 1, gradeRange: "5-6", prompt: "Think about the media you consumed today (videos, social media, or music). Describe honestly whether these things made you feel more confident or more anxious. How can you be more \"intentional\" about what you let into your mind tomorrow?" },
  { id: "C027", week: 2, day: 2, gradeRange: "5-6", prompt: "Describe a moment today where you risked looking \"slow\" or \"confused\" in order to ask a question or learn something new. What did you gain by choosing growth over staying \"safe\" and comfortable?" },
  { id: "C028", week: 2, day: 3, gradeRange: "5-6", prompt: "Think of a strong emotion you felt today. Describe the trigger, your immediate feeling, and what you did in the first ten seconds. Was your response a choice you made, or did your feelings make the choice for you?" },
  { id: "C029", week: 2, day: 4, gradeRange: "5-6", prompt: "Was your screen time today a conscious decision, or did you find yourself scrolling without a plan? Describe what that time replaced—was it sleep, talking to family, or a hobby—and how you feel about that trade-off." },
  { id: "C030", week: 2, day: 5, gradeRange: "5-6", prompt: "Describe a moment where you noticed someone being left out or ignored. What did it take for you to step out of your comfort zone to include them, and how did it change the dynamic of the group?" },
  { id: "C031", week: 3, day: 1, gradeRange: "5-6", prompt: "Tell about something you did at home today to help out without being asked. Was this act done out of genuine care, habit, or because you felt you had to? How do you want your motivation to change for tomorrow?" },
  { id: "C032", week: 3, day: 2, gradeRange: "5-6", prompt: "Describe a time today when you went out of your way to encourage someone. Explain how you noticed they needed a lift and what it \"cost\" you in terms of time, effort, or social courage." },
  { id: "C033", week: 3, day: 3, gradeRange: "5-6", prompt: "Write about a time this week where doing the right thing was \"socially costly\" (it might have made you unpopular or caused a disagreement). Why was the \"uncomfortable truth\" better than the \"easy path\"?" },
  { id: "C034", week: 3, day: 4, gradeRange: "5-6", prompt: "Describe the exact moment today when you wanted to quit a hard task. What was your body feeling, and what specific thought helped you push through to the end?" },
  { id: "C035", week: 3, day: 5, gradeRange: "5-6", prompt: "Reflect on your conversations today. Describe one thing you said that you are proud of because it built someone up, and one thing said (even behind someone's back) that you wish you could take back." },
  { id: "C036", week: 4, day: 1, gradeRange: "5-6", prompt: "Describe a situation today where a shortcut or a small lie was genuinely tempting. Walk through what the temptation offered you (ease, less embarrassment, etc.) and explain the reasoning behind your final choice." },
  { id: "C037", week: 4, day: 2, gradeRange: "5-6", prompt: "What does \"taking responsibility before being asked\" actually look like in your life right now? Describe a specific moment where you took ownership of a mistake or a task before anyone else pointed it out." },
  { id: "C038", week: 4, day: 3, gradeRange: "5-6", prompt: "Was there a moment today where you were more interested in \"looking good\" and getting credit than in actually \"doing good\"? Describe the situation honestly and what it tells you about where you find your confidence." },
  { id: "C039", week: 4, day: 4, gradeRange: "5-6", prompt: "What was the hardest thing you stayed with this week, even after it \"knocked you down\"? Describe the feeling of sticking with it and what you learned about your own strength by Friday." },
  { id: "C040", week: 4, day: 5, gradeRange: "5-6", prompt: "If you hurt someone's feelings or caused a conflict this week, describe the specific steps you took (or need to take) to repair the relationship. Why is \"fixing it\" better than just \"letting it pass\"?" },

  // Grades 7-8
  { id: "C041", week: 1, day: 1, gradeRange: "7-8", prompt: "Identify one specific thing from today that you are genuinely grateful for. Go beyond the surface—what exactly happened, who made it possible, and what would the \"vibe\" of your day have been without it?" },
  { id: "C042", week: 1, day: 2, gradeRange: "7-8", prompt: "When you faced a challenge or a failure today, what did the voice in your head say? Describe whether you treated that difficulty as proof of a \"limit\" or as a signal showing you exactly where to focus your effort next." },
  { id: "C043", week: 1, day: 3, gradeRange: "7-8", prompt: "Compare a moment today where you did the right thing in secret with a moment where you behaved well because you were being watched. What does the gap between those two versions of you reveal about your current character goals?" },
  { id: "C044", week: 1, day: 4, gradeRange: "7-8", prompt: "Reflect on a task that mattered today. Did you bring your \"best effort,\" or just enough to get by? Describe the internal cost of \"cutting corners\"—not just for the grade, but for your own standard of excellence." },
  { id: "C045", week: 1, day: 5, gradeRange: "7-8", prompt: "Describe a moment today where your academic honesty or independent thinking was tested. Did you \"pretend\" to understand or let others carry the load, or did you take the harder path of thinking for yourself?" },
  { id: "C046", week: 2, day: 1, gradeRange: "7-8", prompt: "Think about everything you let into your mind today (social media, peer conversations, etc.). Name one specific thing you consumed and describe honestly whether it left you better or worse than it found you." },
  { id: "C047", week: 2, day: 2, gradeRange: "7-8", prompt: "Did you \"play it safe\" today to stay comfortable, or did you risk being wrong or looking confused in order to actually learn? Describe the moment you made that choice and what you gained or gave up because of it." },
  { id: "C048", week: 2, day: 3, gradeRange: "7-8", prompt: "Most damage is done in the ten seconds after a strong emotion hits. Describe a moment today where you were triggered—what did you feel, what did you do, and was that a chosen response or just a reaction?" },
  { id: "C049", week: 2, day: 4, gradeRange: "7-8", prompt: "Reflect on your screen time today. Was it a conscious choice with a time limit, or did it \"just happen\" to you? Describe what that time replaced and how you would change your \"digital boundaries\" tomorrow." },
  { id: "C050", week: 2, day: 5, gradeRange: "7-8", prompt: "Reflect on a moment this week where you saw a need—perhaps someone being excluded or a rule being broken—but you kept walking. What held you back (fear, social standing, or effort), and what would it take to act differently next time?" },
  { id: "C051", week: 3, day: 1, gradeRange: "7-8", prompt: "Describe a moment at home today where you took initiative without being asked. Was this act driven by genuine care for your family, or just habit? How does your contribution at home shape the person you are becoming?" },
  { id: "C052", week: 3, day: 2, gradeRange: "7-8", prompt: "Describe a small act of encouragement or help you gave today that no one else saw. Explain why you noticed that person's need and what it cost you in terms of time, effort, or social courage." },
  { id: "C053", week: 3, day: 3, gradeRange: "7-8", prompt: "Did you face a moment this week where doing the right thing might have cost you a friendship or social approval? Describe the situation, what you risked, and how you feel about the choice you made." },
  { id: "C054", week: 3, day: 4, gradeRange: "7-8", prompt: "Describe the moment today when the urge to quit was strongest. What was your body feeling (tightness, tiredness, etc.), and what specific internal dialogue helped you push through the \"wall\"?" },
  { id: "C055", week: 3, day: 5, gradeRange: "7-8", prompt: "Words said \"behind someone's back\" carry significant weight. Describe one thing you said today that you are proud of, and one thing you'd take back. What would it mean for your words to be truly worth listening to?" },
  { id: "C056", week: 4, day: 1, gradeRange: "7-8", prompt: "Describe a moment today when a shortcut or a small lie felt genuinely tempting. Walk through the internal negotiation: what was the temptation offering you, and what was the actual \"cost\" to your integrity if you gave in?" },
  { id: "C057", week: 4, day: 2, gradeRange: "7-8", prompt: "Reflect on a moment today where you needed a \"push\" to do what you were supposed to do. What was behind that—avoidance, distraction, or something else? Describe what \"taking responsibility\" looks like without being watched." },
  { id: "C058", week: 4, day: 3, gradeRange: "7-8", prompt: "Was there a moment today where you were more interested in \"looking good\" or getting credit than in the work itself? Describe the situation and how you might let someone else \"shine\" next time." },
  { id: "C059", week: 4, day: 4, gradeRange: "7-8", prompt: "Looking back over the week, what was the hardest thing you stayed with or came back to after failing? What do you know about your own resilience now that you didn't know on Monday morning?" },
  { id: "C060", week: 4, day: 5, gradeRange: "7-8", prompt: "Is there a grudge or a hurt you are keeping alive inside? Describe the situation and reflect on whether you are willing to let it go—not because what happened was okay, but so it stops \"poisoning\" your own heart." },
];

// ────────────────────────────────────────────
// QUESTION LOOKUP
// ────────────────────────────────────────────
const ALL_QUESTIONS: Record<QuestionCategory, QuestionEntry[]> = {
  academic: ACADEMIC_QUESTIONS,
  emotion: EMOTION_QUESTIONS,
  character: CHARACTER_QUESTIONS,
};

/**
 * Get the question for a specific category, grade, week, and day.
 */
export function getQuestion(
  category: QuestionCategory,
  grade: number,
  week: number,
  day: number,
): QuestionEntry | undefined {
  const gradeRange = grade <= 4 ? "3-4" : grade <= 6 ? "5-6" : "7-8";
  return ALL_QUESTIONS[category].find(
    (q) => q.gradeRange === gradeRange && q.week === week && q.day === day,
  );
}

/**
 * Get all questions for a grade range and category.
 */
export function getQuestionsForGrade(
  category: QuestionCategory,
  grade: number,
): QuestionEntry[] {
  const gradeRange = grade <= 4 ? "3-4" : grade <= 6 ? "5-6" : "7-8";
  return ALL_QUESTIONS[category].filter((q) => q.gradeRange === gradeRange);
}

// ────────────────────────────────────────────
// Remote fetcher — pulls live prompt from the
// matching `*_database` table in your Supabase.
// Falls back to the local mock if no row found.
// ────────────────────────────────────────────
import { supabase } from "@/integrations/supabase/client";

const TABLE_BY_CATEGORY: Record<
  QuestionCategory,
  "academic_database" | "emotion_database" | "character_database"
> = {
  academic: "academic_database",
  emotion: "emotion_database",
  character: "character_database",
};

export function gradeToBand(grade: number): "3-4" | "5-6" | "7-8" {
  return grade <= 4 ? "3-4" : grade <= 6 ? "5-6" : "7-8";
}

export async function fetchQuestion(
  category: QuestionCategory,
  grade: number,
  week: number,
  day: number,
): Promise<{ prompt: string } | null> {
  const gradeBand = gradeToBand(grade);
  const table = TABLE_BY_CATEGORY[category];
  const { data, error } = await supabase
    .from(table)
    .select("prompt")
    .eq("grade_level", gradeBand)
    .eq("week", week)
    .eq("day", day)
    .maybeSingle();

  if (!error && data?.prompt) return { prompt: data.prompt };

  // Fallback to local mock
  const local = getQuestion(category, grade, week, day);
  return local ? { prompt: local.prompt } : null;
}
