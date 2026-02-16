import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from portfolio.models import Profile, Education, WorkExperience, Project, Skill, Award, Publication, SkillCategory

def populate():
    print("Creating superuser...")
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'bamwesigyecalvinkiiza@gmail.com', 'admin')
        print("Superuser 'admin' created with password 'admin'")
    else:
        print("Superuser 'admin' already exists")

    print("Creating profile...")
    profile, created = Profile.objects.get_or_create(
        name="Calvin Kiiza Bamwesigye",
        defaults={
            'title': "Business Intelligence Analyst & ML Engineer",
            'bio': "Business Intelligence Analyst & ML Engineer passionate about transforming data into actionable insights and building AI-powered solutions",
            'email': "bamwesigyecalvinkiiza@gmail.com",
            'phone': "+256 762 496 588",
            'address': "Uganda",
            'linkedin_link': "https://linkedin.com",
            'github_link': "https://github.com",
        }
    )

    print("Populating education...")
    ed_data = [
        {
            'institution': "WorldQuant University",
            'degree': "Applied Data Science Lab",
            'start_date': "Aug 2025",
            'end_date': "Jan 2026",
            'description': "",
            'order': 1
        },
        {
            'institution': "Makerere University",
            'degree': "BSc Computer Science",
            'start_date': "Jan 2021",
            'end_date': "Jan 2025",
            'description': "",
            'order': 2
        },
        {
            'institution': "Coursera (IBM)",
            'degree': "Professional Certificates",
            'start_date': "2023",
            'end_date': "2023",
            'description': "IBM AI Engineering & Data Science",
            'order': 3
        }
    ]
    for data in ed_data:
        Education.objects.get_or_create(degree=data['degree'], defaults=data)

    print("Populating experience...")
    exp_data = [
        {
            'company': "SanlamAllianz Life Insurance",
            'position': "Business Intelligence Analyst",
            'start_date': "Mar 2025",
            'end_date': "Present",
            'description': "<ul><li>Data engineering (cleaning and preparation)</li><li>Data Analysis & visualization of business insights</li><li>Dashboard building and report automation</li><li>Developing ML models and using RAG LLMs for task automation</li></ul>",
            'order': 1
        },
        {
            'company': "AI for Finance Research Group",
            'position': "ML Engineer | Part-time",
            'start_date': "Jan 2023",
            'end_date': "Mar 2025",
            'description': "<ul><li>Led development of AI-driven banknote authentication system</li><li>Developed and packaged various ML models into applications</li><li>Designed project website and conducted EDA</li><li>Developed AI-powered chatbot for Ugandan currency security features</li><li>Published academic paper on counterfeit detection using AI</li></ul>",
            'order': 2
        },
        {
            'company': "Lexietech Solutions",
            'position': "Data Science Intern",
            'start_date': "Jul 2023",
            'end_date': "Sep 2023",
            'description': "<ul><li>Developed crop disease detection model using computer vision</li><li>Built price prediction model with advanced regression techniques</li><li>Created APIs for model integration with mobile applications</li></ul>",
            'order': 3
        }
    ]
    for data in exp_data:
        WorkExperience.objects.get_or_create(position=data['position'], company=data['company'], defaults=data)

    print("Populating projects...")
    proj_data = [
        {
            'title': "DeepFakesUG - Counterfeit Detection",
            'description': "AI-driven system that swiftly identifies counterfeit Ugandan banknotes by analyzing intricate details and security features, with real-time decision-making capabilities.",
            'image_icon': "🏦",
            'technologies': "Machine Learning, Deep Learning, App Development, Web Development",
            'order': 1
        },
        {
            'title': "Currency Security Features Chatbot",
            'description': "AI-powered chatbot leveraging RAG and LLMs to help users identify and understand Ugandan currency security features through natural language interactions.",
            'image_icon': "💬",
            'technologies': "AI/ML, RAG, LLMs, NLP",
            'order': 2
        },
        {
            'title': "Agrisonic Farmers Assistant",
            'description': "Innovative solution combining machine learning and embedded systems with 7-in-1 NPK soil sensor to help Ugandan farmers optimize crop productivity and sustainable practices.",
            'image_icon': "🌾",
            'technologies': "Machine Learning, Embedded Systems, IoT, Data Science",
            'link': "#",
            'link_text': "GitHub",
            'order': 3
        },
        {
            'title': "Easy Coffee Application",
            'description': "Mobile application designed to assist coffee farmers in rural areas with daily garden activities, built with Flutter and Dart. AI functionality integration in progress.",
            'image_icon': "☕",
            'technologies': "Flutter, Dart, Mobile Dev, Web Dev",
            'link': "#",
            'link_text': "Website",
            'order': 4
        }
    ]
    for data in proj_data:
        Project.objects.get_or_create(title=data['title'], defaults=data)

    print("Populating skills...")
    tech_skills = [
        "Python", "SQL", "Machine Learning", "Deep Learning", "Data Analysis", 
        "Data Visualization", "Tableau", "Django", "Azure Cloud", "Google Cloud", 
        "Docker", "Anaconda", "MS Office Suite"
    ]
    for i, skill in enumerate(tech_skills):
        Skill.objects.get_or_create(name=skill, defaults={'category': 'TECH', 'order': i})

    lang_skills = ["English (Fluent)", "German (Intermediate)"]
    for i, skill in enumerate(lang_skills):
        Skill.objects.get_or_create(name=skill, defaults={'category': 'LANG', 'order': i})

    print("Populating awards...")
    award_data = [
        {'title': "Meta Mentorship Program", 'organization': "", 'date': "2024", 'icon': "🎯", 'order': 1},
        {'title': "IBM AI Engineering Certificate", 'organization': "Coursera", 'date': "", 'icon': "📜", 'order': 2},
        {'title': "IBM Data Science Certificate", 'organization': "Coursera", 'date': "", 'icon': "📊", 'order': 3},
        {'title': "National Merit Admission", 'organization': "University Education", 'date': "2021", 'icon': "🎓", 'order': 4},
        {'title': "DC General Secretary", 'organization': "Students' Council Body", 'date': "", 'icon': "👥", 'order': 5}
    ]
    for data in award_data:
        Award.objects.get_or_create(title=data['title'], defaults=data)

    print("Populating publications...")
    pub_data = [
        {
            'title': "DeepFakesUG: Detecting Counterfeit Ugandan Banknote Using Deep Learning",
            'authors': "Denish Azamuke, Bamwesigye Calvin Kiiza, Marriette Katarahweire, Arthur Jordan Kamurasi, Joshua Muleesi Businge, Isaac Ssozi, Jotham Prince Mukisa, Emmanuel Lule, Engineer Bainomugisha",
            'journal': "Springer Communications in Computer and Information Science (CCIS)",
            'date': "2024"
        }
    ]
    for data in pub_data:
        Publication.objects.get_or_create(title=data['title'], defaults=data)

    print("Database populated successfully!")

if __name__ == '__main__':
    populate()
