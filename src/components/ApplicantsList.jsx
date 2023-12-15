import styled from "styled-components";

export default function ApplicantsList({ applicants }) {
  if (!applicants?.length) return <h3>No applicants yet</h3>;
  return (
    <>
      <h3>
        {applicants.length} {applicants.length === 1 ? "person" : "people"}{" "}
        waiting to adopt it
      </h3>
      <ul>
        {applicants.map((applicant, index) => (
          <StyledListItem key={index}>
            <StyledEmail href={`mailto:${applicant}`}>{applicant}</StyledEmail>
          </StyledListItem>
        ))}
      </ul>
    </>
  );
}
const StyledListItem = styled.li`
  color: white; // replace with your color
  background-color: #6a459c; // replace with your color
  padding: 1em; // add some padding
  width: 100%; // make the items fill the container width
  border-radius: 5px; // round the corners
  margin-bottom: 10px; // add some space between the items
  font-size: 1em; // increase font size
`;
const StyledEmail = styled.a`
  color: white; // replace with your color
  text-decoration: none; // remove underline
  &:hover {
    opacity: 0.8; // add some opacity on hover
  }
`;
