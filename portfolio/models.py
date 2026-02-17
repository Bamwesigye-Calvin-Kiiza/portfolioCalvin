from django.db import models
from ckeditor.fields import RichTextField

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    github_link = models.URLField(blank=True)
    linkedin_link = models.URLField(blank=True)
    website_link = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    start_date = models.CharField(max_length=50)  # Using CharField for flexible date formats like "Aug 2025"
    end_date = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-order']
        
    def __str__(self):
        return f"{self.degree} at {self.institution}"

class WorkExperience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50)
    description = RichTextField()  # Using RichTextField for bullet points custom styling
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return f"{self.position} at {self.company}"

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Upload a project screenshot or cover image")
    image_icon = models.CharField(max_length=10, help_text="Emoji icon or FontAwesome class", blank=True)
    technologies = models.CharField(max_length=500, help_text="Comma separated list of technologies")
    link = models.URLField(blank=True)
    link_text = models.CharField(max_length=50, default="Website", blank=True)
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-order']
        
    def __str__(self):
        return self.title
        
    def get_tech_list(self):
        return [tech.strip() for tech in self.technologies.split(',')]

class SkillCategory(models.TextChoices):
    TECHNOLOGY = 'TECH', 'Technology'
    LANGUAGE = 'LANG', 'Language'

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=4, choices=SkillCategory.choices, default=SkillCategory.TECHNOLOGY)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['category', 'order']
        
    def __str__(self):
        return self.name

class Award(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200, blank=True)
    date = models.CharField(max_length=50)
    icon = models.CharField(max_length=10, default="🏆")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-order']
        
    def __str__(self):
        return self.title

class Publication(models.Model):
    title = models.CharField(max_length=300)
    authors = models.CharField(max_length=500)
    journal = models.CharField(max_length=200)
    date = models.CharField(max_length=50)
    link = models.URLField(blank=True)
    paper = models.FileField(upload_to='publications/', blank=True, null=True, help_text="Upload the publication paper (PDF)")
    
    def __str__(self):
        return self.title
