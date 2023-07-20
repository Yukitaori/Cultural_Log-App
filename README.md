<!-- Introduction -->
<h1 href='#'>🫡Introduction</h1>
<p>Ciao ragazzi e ragazze. 👋.<br/>

Welcome on my app that has no name 🫤.
<p>This is my last personal project during my training at the Wild Code School and I'm glad to present it to you.</p>
<p>I've had two days to code it. The point was to get a full responsive application with a CRUD and a listing feature.</p>
<br/>
<br/>


<!-- Objectives -->
<h1 href='#'>🎯 The Objectives</h1>
<h2>Purpose</h2>
<p>The purpose of my project is to log all the cultural items (movies, books, comic books or discs) that I've seen, read or listened to.</p>
<p>For example, I can add a movie and the informations about it (like the director, the date I've seen it on, if I own it in DVD, if I've lent it to someone, etc.), but I can also list the items by category and filter it, or search for one particular item with its title.</p>
<br/>

<h2>User Target</h2>
<p>For now, it's just me. Keeping it for myself, eh ? 😏</p>

<br/>
<br/>


<!-- Technical stack -->
<h1 href='#'>⚙️Technical Stack used for the project</h1>
<ul>
<li>JavaScript / React.js / CSS vanilla</li>
<li>Node.js / Express / Axios</li>
<li>MySQL</li>
<li>Git / Github</li>
<li>Figma</li>
<li>Trello</li>
</ul>

<br/>
<br/>
<h1 href='#'>🔄Installation</h1>
<h3>Follow these steps</h3>
<ul>
<li>In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them</li>
<li> Clone this repo, enter it</li>
<li> Run command `npm run setup`</li>
<li> Run command `npm run migrate`</li> 
<li> NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`</li>
<li> Create `.env` files in /frontend and /backend following `.env.sample` examples, and insert the values following the instructions.</li>
</ul>

<br/>
<h3>
Some commands :</h3> 
<ul>
<li>`setup` : Initialization of frontend and backend, as well as all toolings</li>
<li> `migrate` : Run the database migration script</li>
<li>`dev` : Starts both servers (frontend + backend) in one terminal</li>
<li>`dev-front` : Starts the React frontend server</li>
<li> `dev-back` : Starts the Express backend server</li>
<li> `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)</li>
<li>`fix` : Fixes linter errors (run it if `lint` growls on your code !)</li>
</ul>

<br/>
<br/>
<!-- Packages -->
<h1 href='#'>📦Packages</h1>
<p>For this project, I used the <a href='https://github.com/WildCodeSchool/js-template-fullstack' target='_blank' rel="noreferrer">Wild Code School - FullStack - Template</a></p>
<h3>The template initially contained  :</h3>
<ul>
<li> _Concurrently_ : Allows for several commands to run concurrently in the same CLI</li>
<li> _Husky_ : Allows to execute specific commands that trigger on _git_ events</li>
<li> _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience</li>
<li> _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced</li>
<li>_Prettier_ : "Quality of code" tool as well, focuses on the styleguide</li>
<li> _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS</li>
<li> _Nodemon_ : Allows to restart the server everytime a .js file is udated</li>
  </ul>

<br/>
<h3>Then I've added :</h3>
<ul>
<li>React Router Dom</li>
<li>Argon2 (for hashing passwords )</li>
<li>JWT - JSON Web Token</li>
<li>Joi (for forms validation)</li>
<li>Axios</li>
<li>React Auto-complete</li>

</ul>
<br/>
<br/>
<h1 href='#'>🚧 What's next 🚧</h1>
<ul>
<li>Video Games section (yaaaaay)</li>
<li>Sort by rating and/or date of reading/watching/listening</li>
<li>Account creation so anyone can enjoy the app</li>
</ul>
<br/>
<br/>
