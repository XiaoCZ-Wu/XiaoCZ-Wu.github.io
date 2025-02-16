document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("#menu");
    const chapterTitle = document.getElementById("chapter-title");
    const chapterText = document.getElementById("chapter-text");
    const controls = document.querySelector(".controls");
    const content = document.getElementById("content");
    const returnToMenu = document.getElementById("return-to-menu");
    let chapters = [];
    let currentChapterIndex = 0;

    // 加载JSON文件
    fetch("text.json")
        .then(response => response.json())
        .then(data => {
            chapters = data;
            generateMenu();
        })
        .catch(error => {
            console.error("Failed to load JSON:", error);
        });

    // 动态生成目录
    function generateMenu() {
        const ul = document.createElement("ul");
        chapters.forEach((chapter, index) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = chapter.title;
            link.addEventListener("click", () => loadChapter(index));
            li.appendChild(link);
            ul.appendChild(li);
        });
        // 清空旧的目录内容并添加新的目录
        menu.innerHTML = "<h2>目录</h2>";
        menu.appendChild(ul);
    }

    // 加载章节内容
    function loadChapter(index) {
        if (index >= 0 && index < chapters.length) {
            currentChapterIndex = index;
            const chapter = chapters[index];
            chapterTitle.textContent = chapter.title;
            chapterText.innerHTML = chapter.text;

            // 显示内容并删除目录
            content.style.display = "block";
            menu.style.display = "none"; // 隐藏目录部分

            // 修改网页title
            document.title = chapter.title

            // 更新控制按钮状态
            updateControls();
        }
    }

    // 更新控制按钮状态
    function updateControls() {
        document.getElementById("prev-chapter-top").style.display = currentChapterIndex > 0 ? "inline" : "none";
        document.getElementById("next-chapter-top").style.display = currentChapterIndex < chapters.length - 1 ? "inline" : "none";
        document.getElementById("prev-chapter-bottom").style.display = currentChapterIndex > 0 ? "inline" : "none";
        document.getElementById("next-chapter-bottom").style.display = currentChapterIndex < chapters.length - 1 ? "inline" : "none";
    }

    // 控制按钮事件
    document.getElementById("prev-chapter-top").addEventListener("click", () => loadChapter(currentChapterIndex - 1));
    document.getElementById("next-chapter-top").addEventListener("click", () => loadChapter(currentChapterIndex + 1));
    document.getElementById("prev-chapter-bottom").addEventListener("click", () => loadChapter(currentChapterIndex - 1));
    document.getElementById("next-chapter-bottom").addEventListener("click", () => loadChapter(currentChapterIndex + 1));

    // 切换为浅色模式
    function toLightMode() {
        document.body.className = "light-mode";
    }

    // 切换为深色模式
    function toDarkMode() {
        document.body.className = "dark-mode";
    }

    // 返回目录
    returnToMenu.addEventListener("click", () => {
        // 清空内容并重新加载目录
        chapterTitle.textContent = "";
        chapterText.innerHTML = "";
        content.style.display = "none";

        // 重新显示目录
        menu.style.display = "block";
    });

    // 创建悬浮按钮
    const scrollTopButton = document.createElement("button");
    scrollTopButton.textContent = "↑";
    scrollTopButton.classList.add("floating-button");
    scrollTopButton.style.position = "fixed";
    scrollTopButton.style.bottom = "140px";
    scrollTopButton.style.right = "20px";
    scrollTopButton.style.width = "30px";
    scrollTopButton.style.height = "30px";
    scrollTopButton.style.borderRadius = "50%";
    scrollTopButton.style.fontSize = "15px";
    scrollTopButton.style.backgroundColor = "#007BFF";
    scrollTopButton.style.color = "#fff";
    scrollTopButton.style.border = "none";
    scrollTopButton.style.cursor = "pointer";
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const scrollBottomButton = document.createElement("button");
    scrollBottomButton.textContent = "↓";
    scrollBottomButton.classList.add("floating-button");
    scrollBottomButton.style.position = "fixed";
    scrollBottomButton.style.bottom = "100px";
    scrollBottomButton.style.right = "20px";
    scrollBottomButton.style.width = "30px";
    scrollBottomButton.style.height = "30px";
    scrollBottomButton.style.borderRadius = "50%";
    scrollBottomButton.style.fontSize = "15px";
    scrollBottomButton.style.backgroundColor = "#007BFF";
    scrollBottomButton.style.color = "#fff";
    scrollBottomButton.style.border = "none";
    scrollBottomButton.style.cursor = "pointer";
    scrollBottomButton.addEventListener("click", () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });

    const light_mode = document.createElement("button");
    light_mode.textContent = "☀";
    light_mode.classList.add("floating-button");
    light_mode.style.position = "fixed";
    light_mode.style.bottom = "60px";
    light_mode.style.right = "20px";
    light_mode.style.width = "30px";
    light_mode.style.height = "30px";
    light_mode.style.borderRadius = "50%";
    light_mode.style.fontSize = "15px";
    light_mode.style.backgroundColor = "#007BFF";
    light_mode.style.color = "#fff";
    light_mode.style.border = "none";
    light_mode.style.cursor = "pointer";
    light_mode.addEventListener("click", toLightMode);

    const dark_mode = document.createElement("button");
    dark_mode.textContent = "☽";
    dark_mode.classList.add("floating-button");
    dark_mode.style.position = "fixed";
    dark_mode.style.bottom = "20px";
    dark_mode.style.right = "20px";
    dark_mode.style.width = "30px";
    dark_mode.style.height = "30px";
    dark_mode.style.borderRadius = "50%";
    dark_mode.style.fontSize = "15px";
    dark_mode.style.backgroundColor = "#007BFF";
    dark_mode.style.color = "#fff";
    dark_mode.style.border = "none";
    dark_mode.style.cursor = "pointer";
    dark_mode.addEventListener("click", toDarkMode);

    // 将按钮添加到页面
    document.body.appendChild(scrollTopButton);
    document.body.appendChild(scrollBottomButton);
    document.body.appendChild(light_mode)
    document.body.appendChild(dark_mode)
});
