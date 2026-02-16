from django.shortcuts import render
from .models import Profile, Education, WorkExperience, Project, Skill, Award, Publication, SkillCategory

def index(request):
    profile = Profile.objects.first()
    education = Education.objects.all()
    experience = WorkExperience.objects.all()
    projects = Project.objects.all()
    
    # Check if we have any projects, if not create dummy one or handle empty state
    # But usually we'd populate via admin.
    
    tech_skills = Skill.objects.filter(category=SkillCategory.TECHNOLOGY)
    lang_skills = Skill.objects.filter(category=SkillCategory.LANGUAGE)
    
    awards = Award.objects.all()
    publications = Publication.objects.all()
    
    context = {
        'profile': profile,
        'education': education,
        'experience': experience,
        'projects': projects,
        'tech_skills': tech_skills,
        'lang_skills': lang_skills,
        'awards': awards,
        'publications': publications,
    }
    return render(request, 'portfolio/index.html', context)
