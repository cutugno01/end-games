import React from "react";

const Footer = () => {
  const team = [
    {
      id: 1,
      name: "Samuel Raffa",
      mat: "518206",
      role: "Back-end",
      link: "https://www.linkedin.com/in/samuel-raffa-413279210/",
    },
  ];
  return (
    <div className="footer flex-center">
      <h3 className="footer-title">App created by:</h3>
      {team.map((member) => {
        return (
          <a
            href={member.link}
            target="_blank"
            rel="noreferrer"
            key={member.id}
            className="footer-link"
          >
            {member.name}&nbsp;-&nbsp;
            <u>&#91;{member.mat}&#93;</u>
            &nbsp;-&nbsp;
            <i>{member.role}</i>
          </a>
        );
      })}
    </div>
  );
};

export default Footer;
