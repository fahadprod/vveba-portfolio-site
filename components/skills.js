export default function Skills() {
  const skills = [
    {
      id: 1,
      name: "HTML",
      percentage: "95%",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis facere provident quis expedita veniam commodi."
    },
    {
      id: 2,
      name: "CSS",
      percentage: "90%",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis facere provident quis expedita veniam commodi."
    },
    {
      id: 3,
      name: "JavaScript",
      percentage: "85%",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis facere provident quis expedita veniam commodi."
    },
    {
      id: 4,
      name: "ReactJS",
      percentage: "75%",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis facere provident quis expedita veniam commodi."
    },
    {
      id: 5,
      name: "NodeJS",
      percentage: "85%",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis facere provident quis expedita veniam commodi."
    },
    {
      id: 6,
      name: "VueJS",
      percentage: "75%",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis facere provident quis expedita veniam commodi."
    }
  ];

  return (
    <section className="skills">
      <h1 className="section-bg-heading">My Skills</h1>
      <h1 className="section-heading">Professional Skills</h1>
      <h3 className="sub-heading">My <span>Skills</span></h3>
      <div className="section-border"></div>
      <div className="skills-cards">
        {skills.map(skill => (
          <div key={skill.id} className="skills-card">
            <div className="skill">
              <span>{skill.name}</span>
              <span>{skill.percentage}</span>
            </div>
            <p>{skill.description}</p>
            <div className="skills-card-progress"></div>
          </div>
        ))}
      </div>
    </section>
  );
}