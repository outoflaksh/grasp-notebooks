<div id="top"></div>

<br />
<div align="center">
  <a href="https://github.com/outoflaksh/grasp-notebooks">
    <img src="./frontend/public/logo.png" width="auto" height="60">
  </a>

  <p align="center">
    A New Way to Write & Learn SQL
    <br />
    <br />
    <a href="https://github.com/outoflaksh/grasp-notebooks/issues">Report Bug</a>
    ·
    <a href="https://github.com/outoflaksh/grasp-notebooks/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Grasp provides a unique and easier way to write and learn SQL. It's like Jupyter notebooks except that you can run SQL queries as code blocks. With Grasp, we wanted to create a coding notebook-like experience but for executing SQL. The main goal was to make it easy for people to learn SQL, by providing the ability to:

1. Save the queries and their results.
2. Share notebooks so that others can view them.
3. Add Markdown documentation in between code blocks to provide context.

Grasp provides ways to accomplish all that! Here's what a typical Grasp notebook looks like:

![Grasp Notebook Screen Shot][product-screenshot]

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

- Python
- FastAPI
- Planetscale
- React.js

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Set up your Planetscale database and add `DATABASE_URL` in a `.env` file in the root directory. Also generate a SECRET_KEY for JWT auth. You can use the    following command:
   ```sh
   openssl rand -hex 32
   ```
2. Clone the repo
   ```sh
   git clone https://github.com/outoflaksh/grasp-notebooks.git
   ```
3. Install the Python dependencies using Pipenv or the `requirements.txt` file. 
   ```sh
   pip3 install -r requirements.txt
   OR
   pip3 install pipenv
   pipenv install
   pipenv shell
   ```
   Then, run the FastAPI server with Uvicorn.
   ```sh
   uvicorn api.main:app
   ```
4. Install dependencies for the React frontend.
   ```sh
   cd frontend && npm install
   ```
5. Run the React server.
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Data visualisation
- [ ] Export notebooks as PDF files
- [ ] Collaborative notebooks

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: https://cdn.hashnode.com/res/hashnode/image/upload/v1659250092951/ZmRN_fVhK.png
