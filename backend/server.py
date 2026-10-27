from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated
from bson import ObjectId
import os
import logging
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(extra="allow", populate_by_name=True)
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc) if doc else None

    def to_mongo(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id", None)
        return data


class PortfolioDocument(BaseDocument):
    pass


SEED = {
    "profile": {
        "name": "Rahman Hanif Aji Saputra",
        "first_name": "Hanif",
        "role": "Data Analyst & Data Enthusiast",
        "location": "Jakarta, Indonesia",
        "email": "hanifaji26@gmail.com",
        "availability": "Open to Data & BI Roles",
        "intro": "I'm a data analyst & data enthusiast who loves asking messy questions of clean — and messy — datasets, then answering them with SQL, Python, and a dashboard people actually enjoy using.",
        "photo": "https://images.unsplash.com/photo-1604261605115-4b34b646a05c?q=85&w=1000&auto=format&fit=crop",
    },
    "socials": [
        {"label": "LinkedIn", "url": "https://linkedin.com/in/hanifaji"},
        {"label": "GitHub", "url": "https://github.com/hanifaji"},
        {"label": "Kaggle", "url": "https://kaggle.com/hanifaji"},
        {"label": "Instagram", "url": "https://instagram.com/hanif.data"},
        {"label": "Email", "url": "mailto:hanifaji26@gmail.com"},
    ],
    "stats": [
        {"value": "1+", "label": "Years of Experience"},
        {"value": "25+", "label": "Dashboards Built"},
        {"value": "40+", "label": "Projects Delivered"},
    ],
    "about": "I'm Hanif, a data analyst with 1+ years of experience turning raw numbers into decisions. I've partnered with product, marketing, and ops teams to build 25+ dashboards, automate reporting, and ship analyses that changed what we built next. My happy place: a well-joined table and a chart that finally makes sense.",
    "education": [
        {"degree": "B.Sc. in Statistics", "school": "Universitas Diponegoro", "period": "2020 — 2024", "detail": "GPA 3.82/4.00 · Concentration in Data Analytics"},
        {"degree": "Google Data Analytics Professional Certificate", "school": "Google · Coursera", "period": "2024", "detail": "8-course program covering SQL, R, Tableau & case studies"},
    ],
    "tools": ["Excel", "SQL", "Python", "R", "Power BI", "Tableau", "Pandas", "scikit-learn", "PostgreSQL", "BigQuery", "Looker Studio", "Git"],
    "projects": [
        {
            "num": 1,
            "title": "E-commerce Sales Analysis for Marketing Strategy",
            "category": "Marketing Analytics",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
            "about": "This project focuses on analyzing sales performance on an e-commerce platform to identify trends, customer behavior, and sales growth opportunities. The analysis serves as the basis for a more effective, data-driven marketing strategy.",
            "company": {"name": "Tokopedia", "industry": "E-commerce", "size": "1,000+ employees", "location": "Jakarta, Indonesia"},
            "tools": ["Excel", "SQL", "Python", "Power BI", "Tableau"],
        },
        {
            "num": 2,
            "title": "Customer Churn Analysis for Retention Program",
            "category": "Machine Learning",
            "image": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1400&auto=format&fit=crop",
            "about": "Built a churn prediction model on telecom customer data to spot at-risk subscribers early, then translated the key drivers into a targeted retention playbook for the CRM team.",
            "company": {"name": "Telkomsel", "industry": "Telecommunications", "size": "5,000+ employees", "location": "Jakarta, Indonesia"},
            "tools": ["Python", "SQL", "scikit-learn", "Power BI"],
        },
        {
            "num": 3,
            "title": "HR Analytics Dashboard for Workforce Planning",
            "category": "BI Dashboard",
            "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
            "about": "Consolidated HRIS, attendance, and recruitment data into an executive dashboard tracking headcount, turnover, and hiring-funnel health across all departments.",
            "company": {"name": "Gojek", "industry": "Technology", "size": "3,000+ employees", "location": "Jakarta, Indonesia"},
            "tools": ["Excel", "SQL", "Tableau", "R"],
        },
        {
            "num": 4,
            "title": "Sales Forecasting & Inventory Optimization",
            "category": "Forecasting",
            "image": "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1400&auto=format&fit=crop",
            "about": "Time-series forecasting of monthly product demand to align procurement with expected sales, cutting stock-outs and overstock across distribution centers.",
            "company": {"name": "Unilever Indonesia", "industry": "FMCG", "size": "4,000+ employees", "location": "Tangerang, Indonesia"},
            "tools": ["Python", "SQL", "Power BI", "Excel"],
        },
    ],
    "experience": [
        {
            "role": "Data Analyst",
            "company": "Tokopedia",
            "period": "2024 — Present",
            "bullets": [
                "Own marketing & growth dashboards and run A/B-test readouts for category managers",
                "Automated weekly reporting with Python + SQL, saving ~10 hours per week",
            ],
            "tools": ["SQL", "Python", "Power BI"],
        },
        {
            "role": "Data Analyst Intern",
            "company": "Gojek",
            "period": "2023 — 2024",
            "bullets": [
                "Analyzed driver retention cohorts and surfaced 3 key churn drivers",
                "Prototyped Looker Studio reports for the operations team",
            ],
            "tools": ["SQL", "Looker Studio", "R"],
        },
        {
            "role": "Business Intelligence Intern",
            "company": "Shopee",
            "period": "2023",
            "bullets": [
                "Cleaned and reconciled 500K+ rows of marketplace transaction data",
                "Supported campaign post-mortem analysis with descriptive statistics",
            ],
            "tools": ["Excel", "SQL", "Tableau"],
        },
    ],
    "certifications": [
        {"title": "Google Data Analytics Professional Certificate", "issuer": "Google", "year": "2024"},
        {"title": "Microsoft Power BI Data Analyst (PL-300)", "issuer": "Microsoft", "year": "2024"},
        {"title": "Data Analysis with Python", "issuer": "freeCodeCamp", "year": "2023"},
        {"title": "Belajar Analisis Data dengan Python", "issuer": "Dicoding", "year": "2023"},
        {"title": "SQL (Advanced) Certificate", "issuer": "HackerRank", "year": "2023"},
        {"title": "McKinsey Forward Program", "issuer": "McKinsey & Company", "year": "2024"},
    ],
    "marquee_words": ["Data Analytics", "Visualization", "SQL", "Storytelling", "Dashboards", "Insights"],
}


async def seed_portfolio():
    if await db.portfolio.count_documents({}) == 0:
        await db.portfolio.insert_one(PortfolioDocument(**SEED).to_mongo())


@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.get("/portfolio")
async def get_portfolio():
    doc = await db.portfolio.find_one()
    if not doc:
        await seed_portfolio()
        doc = await db.portfolio.find_one()
    model = PortfolioDocument.from_mongo(doc)
    return model.model_dump(by_alias=False)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_seed():
    await seed_portfolio()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
