REPLACEMENTS = [
    # Câu trúc, dấu câu
    ("..", "."),               # Thay ".." thành "."
    ("!.", "!"),               # Thay "!." thành "!"
    ("?.", "?"),               # Thay "?." thành "?"
    (" .", "."),               # Loại bỏ khoảng trắng trước dấu chấm
    (" ,", ","),               # Loại bỏ khoảng trắng trước dấu phẩy
    ('"', ""),                 # Loại bỏ dấu ngoặc kép
    ("'", ""),                 # Loại bỏ dấu nháy đơn

    # Viết tắt phổ biến
    ("AI", "Ây Ai"),
    ("A.I", "Ây Ai"),
    ("API", "A P I"),
    ("UI", "U I"),
    ("UX", "U X"),
    ("IDE", "I D E"),
    ("SDK", "S D K"),
    ("JWT", "J W T"),
    ("CLI", "C L I"),
    ("HTTP", "H T T P"),
    ("HTTPS", "H T T P S"),
    ("CSS", "C S S"),
    ("HTML", "H T M L"),
    ("URL", "U R L"),
    ("JSON", "J S O N"),
    ("SQL", "S Q L"),
    ("ORM", "O R M"),
    ("REST", "Rét"),
    ("CRUD", "C R U D"),

    # Ngôn ngữ, framework
    ("Python", "Pai-thần"),
    ("JavaScript", "Gia-va-scrip"),
    ("TypeScript", "Tai-scrip"),
    ("Java", "Gia-va"),
    ("C#", "Si sáp"),
    ("C++", "Si cộng cộng"),
    ("Go", "Gô-lang"),
    ("Rust", "Rớt"),
    ("Ruby", "Ru-bi"),
    ("PHP", "P H P"),
    ("Node.js", "Nốt chấm J S"),

    # Framework / thư viện phổ biến
    ("React", "Ri-ác"),
    ("ReactJs", "Ri-ác J S"),
    ("React.Js", "Ri-ác J S"),
    ("Vue", "Viu"),
    ("Angular", "Ăng-giu-la"),
    ("Next.js", "Nét J S"),
    ("NextJs", "Nét J S"),
    ("Nuxt.js", "Nắc J S"),
    ("NestJS", "Nét S J S"),
    ("Nest.JS", "Nét S J S"),
    ("Express", "Ích-prét"),
    ("Django", "Jan-gô"),
    ("Flask", "Phờ-lát-sờ-cờ"),
    ("FastAPI", "Phát A P I"),
    ("Koa", "Cô-a"),

    # Các khái niệm phổ biến
    ("frontend", "phờ-rần"),
    ("backend", "béc-èn"),
    ("fullstack", "phun-sờ-tác"),
    ("database", "đây-ta-bây"),
    ("microservice", "mai-cro sờ-vít"),
    ("container", "con-tê-nơ"),
    ("docker", "đốc-cờ"),
    ("kubernetes", "ku-bơ-nét"),
    ("cloud", "cờ-lau"),
    ("serverless", "sơ-vơ-lét"),
    ("devops", "đép-óp"),

    # Công cụ và dịch vụ
    ("Git", "Gít"),
    ("GitHub", "Gít-hắp"),
    ("GitLab", "Gít-láp"),
    ("Bitbucket", "Bít-bă-kịt"),
    ("Postman", "Pốt-men"),
    ("Jenkins", "Ghi-nkinz"),
    ("Travis CI", "Tra-vít C I"),
    ("CircleCI", "Xơ-cờ C I"),

    # Cơ sở dữ liệu và lưu trữ
    ("MongoDB", "Mon-gô đi-bi"),
    ("MySQL", "Mai S Q L"),
    ("PostgreSQL", "Pót-gờ ré S Q L"),
    ("Redis", "Rê-đít"),
    ("SQLite", "Ét S Q L lai"),

    # Các công nghệ khác
    ("Docker Compose", "Đốc-cờ Com-pôz"),
    ("Terraform", "Ter-ra-phôm"),
    ("Ansible", "An-si-bôl"),
    ("Prometheus", "Pro-mê-thiu"),
    ("Grafana", "Grap-fa-na"),

    # Thuật ngữ AI và ML
    ("Machine Learning", "Mờ-sin Lớ-ninh"),
    ("Deep Learning", "Điệp Lớ-ninh"),
    ("Neural Network", "Niu-rồ Nét-woặc"),
    ("NLP", "En-êl-pi"),
    ("Computer Vision", "Compu-tơ Viet-sơn"),
    ("Data Science", "Đây-ta Sài-ân"),

     # Phương pháp và quy trình phát triển phần mềm
    ("Scrum", "Scrum"),                # Giữ nguyên vì không cần phiên âm
    ("Kanban", "Kan-ban"),
    ("Agile", "Ăgai"),
    ("MVP", "M V P"),
    ("ROI", "R O I"),
    ("SRE", "Éch Rờ Ê"),
    ("TDD", "Tê đi đi"),
    ("BDD", "Bê đi đi"),
    ("DDD", "Đê đi đi"),
]
