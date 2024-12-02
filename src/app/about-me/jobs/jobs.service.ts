import { Directive, Injectable } from '@angular/core';


import { JobItem } from './job-item';

@Injectable()
export class JobService {
  getAds() {
    return [
      new JobItem({
        role: 'Software Engineer', company: 'Windracers', startMonth: "May", startYear: "2023",  description:
        `
        Creative leader in the Mission Software Team. Where my role was to develop and maintain a range of micro-services. This included integrating these services into the Distributed Control Application.
        Building on the existing code base I was instrumental in improving the security and software development practices of the business.
        I stepped into a wide variety of roles including: Managing IT, Fire Warden and First Aid Officer.
        What I enjoy most about my current role is gathering the requirements from the end users and delivering this to them.
        `
      }),
      new JobItem({
        role: 'Software Engineer', company: 'OptimalSlope Ltd', startMonth: "November", startYear: "2022", endMonth: "April", endYear: "2023",  description:
        `Developing a new C# desktop application to improve the capability to create optimal slope walls for mining. contributed to design and functionality of the full stack application.`
      }),
      new JobItem(
        {
          role: 'Programme Coordinator', company: 'PGL Travel LTD', startMonth: "July", startYear: "2022", endMonth: "September", endYear: "2022", description:
            `As a programme coordinator my Job was to write and run the staff program and deal with the staff holidays.
            Through this dealt with any changes the schools changes as well as requests they make. My job role also involved
            managing the reception team as well as AIGL's in relation to their programme.`
        }
      ),
      new JobItem(
        {
          role: 'Activities Instructor / Group Leader', company: 'PGL Travel LTD', startMonth: "February", startYear: "2022", endMonth: "October", endYear: "2022", description:
            `
            Ran outdoor Activities to groups of up to 24. These activities included anything from problem solving and
            orienteering to Zip wire and Giant Swing. As A Group Leader the role included talking with the accompanying adults
            and leasing with them to make their stay. Giving the Adults a break from the kids by entertaining and organising
            any changes with the company.
          `
        }
      ),
      new JobItem(
        {
          role: 'Technology associate', company: 'Commonwealth Bank of Australia', startMonth: "June", startYear: "2021", endMonth: "January", endYear: "2022", description:
            `Managed and delivered a C# .Net application. Worked in the workplace technologies team to deliver a VPN solution rollout as an Engineer. Investing time in working on Developing tools to improve Engineers' ways of working.`
        }
      ),
      new JobItem(
        {
          role: 'ICT Officer', company: 'Green Point Christian College', startMonth: "March", startYear: "2021", endMonth: "December", endYear: "2021", description:
            `Service desk engineer helping staff and students Investigate and analyse workplace practices to optimise workflow, load and efficacy of the ICT department.`
        }
      ),
      new JobItem(
        {
          role: 'Innovation Student', company: 'Bachelor of Creative Intelligence and Innovation (UTS)', startYear: "2017", endYear: "2020", description:
            `As a part of my Bachelor of Creative Intelligence and Innovation I had the unique opportunity of working with a wide range of industry partners
            to formulate different products and solutions to solve a wide range of issues. These partners included Telstra, Delloit, City of Sydney, Transport NSW, Two Collaborate.
            Through these experiences I developed a deep understanding of problem solving collaboration and innovation these of which I reflect on often in my day to day workplace.This course has also
            been a great time for increasing my IQ and improving a wide range of skills.`
        }
      ),
      new JobItem(
        {
          role: 'Software Developer', company: 'Assertiv Pty Ltd', startYear: "2018", endYear: "2021", description:
            `During my time at Assertiv I had the opportunity to work individually on tasks where I had the opportunity
            to work on a Full stack of development on AWS. This included the use of Node.js using typescript and the
            angular stack. The work I completed included both front end development and backend. Through both of these
            opportunities I was tasked to update and design different aspects of the application. I have also had the
            opportunity to talk to my managers about different initiatives that we could implement in the workplace.`
        }
      ),
      new JobItem(
        {
          role: 'Software Developer', company: 'Assertiv Pty Ltd', startYear: "2018", endYear: "2021", description:
            `Working independently to complete a wide variety of tasks using my research skills and technical skills.
            This included learning and using yaml to automate the deployment of a client's environment. Deployment and
            integration of containers into foreign clients environments. Designing and implementation of the internal
            infrastructure at Assertiv.`
        }
      ),
      new JobItem(
        {
          role: 'Volunteer', company: 'Ev Church', startYear: "2016", endYear: "2022", description:
            `Assisting with the management of electrical needs of a medium business, customer service, assistance with
            general IT implementation of FreePBX and 3cx Deployment and ongoing maintenance. I am a valuable production
            personnel. My role continuously changes and has included controlling projectors, laying cables, managing
            lights and to manage and assist in other areas of production. This includes managing electrical needs while
            organising and leasing with other businesses for events.
            I have also assisted in the running of a range of different activities for a wide range of children In a
            wide range of roles.`
        }
      ),
      new JobItem(
        {
          role: 'Casual', company: 'Ev Church', startYear: "2016", endYear: "2022", description:
            `Assisting with the management of electrical needs of a medium business, customer service, assistance with
            general IT implementation of FreePBX and 3cx Deployment and ongoing maintenance. I am a valuable production
            personnel. My role continuously changes and has included controlling projectors, laying cables, managing
            lights and to manage and assist in other areas of production. This includes managing electrical needs while
            organising and leasing with other businesses for events.
            I have also assisted in the running of a range of different activities for a wide range of children In a
            wide range of roles.`
        }
      ),
      new JobItem(
        {
          role: 'Casual', company: 'VOIP Pty Ltd', startYear: "2016", endYear: "2018", description:
            `Installation of Routers and Switches into travel cases for Macquarie Telecom end customer Australian Unity.
            Ongoing testing & refurbishment of 1300 plus AVAYA / Nortel phones for Optus end customer Australian Tax
            Office.Assistance IT with internal building refurbishment at VoIP Pty Ltd. Switch Patching, Testing
            connectivity, assembled PCs & cabling etc. Cisco Phone Deployment for the Department of Immigration and
            Border Protection Ongoing testing & refurbishment of 13000 plus AVAYA / Nortel phones for Optus end customer
            Australian Tax Office.`
        }
      ),
    ];
  }
}

