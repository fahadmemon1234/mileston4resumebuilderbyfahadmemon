const checkbox = document.getElementById(
  "toggleSkillsButton"
) as HTMLInputElement;

checkbox.addEventListener("change", function () {
  toggleSectionVisibility(this.checked ? true : false);
});

function toggleSectionVisibility(isVisible: boolean): void {
  const section = document.getElementById("skillsSection");

  if (section) {
    if (isVisible == true) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }
}

function GenerateResume(): void {
  const nameInput = document.getElementById("txtName") as HTMLInputElement;
  const emailInput = document.getElementById("txtEmail") as HTMLInputElement;
  const phoneInput = document.getElementById("txtPhone") as HTMLInputElement;
  const About = document.getElementById("txtabout") as HTMLInputElement;
  const profilePictureInput = document.getElementById(
    "txtProfile"
  ) as HTMLInputElement;
  const collegeNameInput = document.getElementById(
    "txtclg"
  ) as HTMLInputElement;
  const eduStartDateInput = document.getElementById(
    "txteduStartDate"
  ) as HTMLInputElement;
  const eduEndDateInput = document.getElementById(
    "txteduEndDate"
  ) as HTMLInputElement;
  const educationDescriptionInput = document.getElementById(
    "txtEducationDescription"
  ) as HTMLTextAreaElement;
  const skillInput = document.getElementById("txtSkill") as HTMLInputElement;
  const companyNameInput = document.getElementById(
    "txtCompanyName"
  ) as HTMLInputElement;
  const position = document.getElementById("txtPosition") as HTMLInputElement;
  const expStartDateInput = document.getElementById(
    "txtexStartDate"
  ) as HTMLInputElement;
  const expEndDateInput = document.getElementById(
    "txtexEndDate"
  ) as HTMLInputElement;
  const experienceDescriptionInput = document.getElementById(
    "txtExperienceDescription"
  ) as HTMLTextAreaElement;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const profilePicture = profilePictureInput.files?.[0];
  const collegeName = collegeNameInput.value.trim();
  const eduStartDate = eduStartDateInput.value.trim();
  const eduEndDate = eduEndDateInput.value.trim();
  const educationDescription = educationDescriptionInput.value.trim();
  const skill = skillInput.value.trim();
  const companyName = companyNameInput?.value.trim();
  const positiontxt = position.value.trim();
  const expStartDate = expStartDateInput.value.trim();
  const expEndDate = expEndDateInput.value.trim();
  const experienceDescription = experienceDescriptionInput.value.trim();
  const aboutText = About.value.trim();

  const formatDateRange = (startDate: string, endDate: string): string => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();
    return `${startYear} - ${endYear}`;
  };

  if (
    name !== "" &&
    email !== "" &&
    phone !== "" &&
    collegeName !== "" &&
    eduStartDate !== "" &&
    eduEndDate !== "" &&
    educationDescription !== "" &&
    skill !== "" &&
    companyName !== "" &&
    positiontxt !== "" &&
    expStartDate !== "" &&
    expEndDate !== "" &&
    experienceDescription !== "" &&
    aboutText !== ""
  ) {
    const formattedEduDates = formatDateRange(eduStartDate, eduEndDate);
    const formattedExpDates = formatDateRange(expStartDate, expEndDate);

    const resumeHTML = `
    <main class="main-content">
        <section class="left-section">
            <div class="left-content">
                <div class="profile">
                    <div class="image">
                        <img src="${
                          profilePicture
                            ? URL.createObjectURL(profilePicture)
                            : "https://art-template.ru/vcard1/assets/img/avatar-1.jpg"
                        }" alt="">
                    </div>
                    <h2 class="name" contenteditable="true">${name}</h2>
                    <p class="career">Web Developer</p>
                </div>
                <div class="contact-info">
                    <h3 class="main-title">Contact Info</h3>
                    <ul>
                        <li><i class="fa fa-phone"></i><span contenteditable="true">${phone}</span></li>
                        <li><i class="fa-solid fa-envelope"></i><span contenteditable="true">${email}</span></li>
                    </ul>
                </div>
                <div class="skills-section">
                    <h3 class="main-title">Skills</h3>
                    <ul>
                        <li>
                            <p class="skill-title" contenteditable="true">${skill}</p>
                            <div class="progress-bar">
                                <div class="progress"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="right-section">
            <div class="right-main-content">
                <section class="about sect">
                    <h2 class="right-title">About Me</h2>
                    <p class="para" contenteditable="true">${aboutText}</p>
                </section>
                <section class="experience sect">
                    <h2 class="right-title">Experience</h2>
                    <div class="timeline">
                        <div class="left-tl-content">
                            <h5 class="tl-title" contenteditable="true">${companyName}</h5>
                            <p class="para" contenteditable="true">${formattedExpDates}</p>
                        </div>
                        <div class="right-tl-content">
                            <div class="tl-content">
                                <h5 class="tl-title-2" contenteditable="true">${positiontxt}</h5>
                                <p class="para" contenteditable="true">${experienceDescription}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="education sect">
                    <h2 class="right-title">Education</h2>
                    <div class="timeline">
                        <div class="left-tl-content">
                            <h5 class="tl-title" contenteditable="true">${collegeName}</h5>
                            <p class="para" contenteditable="true">${formattedEduDates}</p>
                        </div>
                        <div class="right-tl-content">
                            <div class="tl-content">
                                <h5 class="tl-title-2" contenteditable="true">${collegeName}</h5>
                                <p class="para" contenteditable="true">${educationDescription}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </main>
    `;

    const resumeOutput = document.getElementById("resume-output");

    if (resumeOutput) {
      resumeOutput.innerHTML = resumeHTML;
      handleEdits();
    } else {
      showError("The resume output is missing");
    }
  } else {
    showError("The resume data is missing or incomplete");
  }
}

function handleEdits() {
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );

  editableElements.forEach((element) => {
    element.addEventListener("input", (event) => {
      const target = event.target as HTMLElement;

      localStorage.setItem(target.id, target.innerHTML);
    });
  });
}

function loadSavedContent() {
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );
  editableElements.forEach((element) => {
    const savedContent = localStorage.getItem(element.id);
    if (savedContent) {
      (element as HTMLElement).innerHTML = savedContent;
    }
  });
}

function showError(message: string) {
  const errorMessage = document.createElement("h1");
  errorMessage.className = "error";
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
  errorMessage.style.textAlign = "center";
  errorMessage.style.padding = "10px";

  document.body.appendChild(errorMessage);

  setTimeout(() => {
    if (document.body.contains(errorMessage)) {
      document.body.removeChild(errorMessage);
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", loadSavedContent);
