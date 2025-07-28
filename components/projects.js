export default function Projects() {
  const projects = [
    {
      id: 1,
      image: "/images/project1.png",
      techs: ["HTML", "CSS", "JavaScript"],
      name: "Contact Form",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum laudantium cumque, possimus sit laborum eius."
    },
    {
      id: 2,
      image: "/images/project2.png",
      techs: ["HTML", "CSS", "JavaScript"],
      name: "Calculator",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum laudantium cumque, possimus sit laborum eius."
    },
    {
      id: 3,
      image: "/images/project3.png",
      techs: ["HTML", "CSS", "JavaScript"],
      name: "Contact Form",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum laudantium cumque, possimus sit laborum eius."
    },
    {
      id: 4,
      image: "/images/project4.png",
      techs: ["HTML", "CSS", "JavaScript"],
      name: "Website",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum laudantium cumque, possimus sit laborum eius."
    },
    {
      id: 5,
      image: "/images/project5.png",
      techs: ["HTML", "CSS", "JavaScript"],
      name: "Menu",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum laudantium cumque, possimus sit laborum eius."
    },
    {
      id: 6,
      image: "/images/project6.png",
      techs: ["HTML", "CSS", "JavaScript"],
      name: "Profile Card",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum laudantium cumque, possimus sit laborum eius."
    }
  ];

  return (
    <section className="projects">
      <h1 className="section-bg-heading">My Projects</h1>
      <h1 className="section-heading">Portfolio</h1>
      <h3 className="sub-heading">My <span>Projects</span></h3>
      <div className="projects-cards">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-img">
              <img src={project.image} alt={project.name} />
            </div>
            <div className="techs">
              {project.techs.map((tech, index) => (
                <span key={index}>
                  {tech}{index < project.techs.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-desc">
              {project.description}
            </p>
            <button type="button" className="project-btn">
              See Project <i className="fa-sharp fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ))}
        <button type="button" className="btn">View More</button>
      </div>
      <div className="section-border"></div>
    </section>
  );
}