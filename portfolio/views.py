from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Profile, Education, WorkExperience, Project, Skill, Award, Publication, SkillCategory
from .forms import ContactForm

def index(request):
    if request.method == 'POST':
        form = ContactForm(request.method == 'POST') # This line is slightly wrong in my thought, fixing it.
        # Actually, let's just do it properly.
        form = ContactForm(request.POST)
        if form.is_valid():
            # In a real app, you'd send an email here.
            # For now, we'll just show a success message.
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('index')
    else:
        form = ContactForm()

    profile = Profile.objects.first()
    education = Education.objects.all()
    experience = WorkExperience.objects.all()
    projects = Project.objects.all()
    
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
        'form': form,
    }
    return render(request, 'portfolio/index.html', context)
