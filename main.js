var container = document.getElementById('mynetwork');
var options = {
    nodes: {
        font: {
            size: 16, // Размер шрифта
            face: 'Arial, sans-serif', // Стандартный шрифт
            multi: 'html' // Позволяет использовать HTML в метках
        }
    },
    interaction: {
        zoomView: false // Отключаем возможность масштабирования
    }
};







// данные графа
var data = {
    nodes: new vis.DataSet([
        // Physical Products
        {id: 1, shape: 'image', description: 'Описание узла 1', image: 'files/safer_pack.png', size: 40},
        {id: 2, shape: 'image', description: 'Описание узла 2', image: 'files/safer_hook.png', size: 40},
        {id: 5, shape: 'image', image: 'files/safer_soap.png', size: 30},

        {id: 3, shape: 'image', description: 'Fungi Mission <br> <br>  Mycelium is a hundred percent biodegradable, fire-resistant, soundproof, and beautiful material that grows by recycling waste. It sounds like something that needs a brand identity and industrial design.', image: 'files/fungi_egg.png', size: 50, relatedImages: ['files/fungi_egg_2.jpg', 'files/fungi_egg_3.jpg']},

        // Identity
        {id: 4, shape: 'image', description: 'Fungi Mission <br><br> Fungi Mission believes in the power of mycelium to save the day', image: 'files/fungi_logo.png',size: 35},
        {id: 6, shape: 'image', description: 'AMMA is an anagram of the word "mother", one of the most common lexemes in Indo-European languages. <br><br> Theorists agree that this word arose as an onomatopoeia for the calling sounds that children make, so it contains a lot of family warmth at the most basic level.', image: 'files/amma_logo.png', size: 50},
        {id: 7, shape: 'image', description: 'AUMI is a jewelry brand that produces always relevant jewelry made of precious metals and laboratory diamonds. <br><br> The basis of plastics were the late works of Matisse and Picasso soft graphics. On their basis, a planar silhouette illustration has been formed, on which AUMI jewelry neatly stands.', image: 'files/aumi_poster.png', size: 50},
        {id: 8, shape: 'image', description: 'Major retailers face human error every day. Many of them need a transparent system to set up and monitor all processes.', image: 'files/qvalon_logo.png', size: 15},

        // Naming
        {id: 9, label: 'Lumin House', shape: 'text', size: 10},
        {id: 10, label: 'Freckles', shape: 'text', size: 10},
        {id: 12, label: 'TripleTen', shape: 'text', size: 10},
        {id: 14, label: 'Parpa', shape: 'text', size: 10},
        // {id: 15, label: 'Qvalon', description: 'Major retailers face human error every day. Many of them need a transparent system to set up and monitor all processes.', shape: 'text', size: 10},
        {id: 17, label: 'Life Control', shape: 'text', size: 10},
        {id: 18, label: 'Inwizo', shape: 'text', size: 10},
        {id: 19, label: 'Parpa Mono', shape: 'text', size: 10},
        {id: 20, label: 'Fabble', shape: 'text', size: 10},
        {id: 21, label: 'Uniko', shape: 'text', size: 10},
        {id: 22, label: 'Noda', shape: 'text', size: 10},
        {id: 23, label: 'Nuum', shape: 'text', size: 10},
        {id: 24, label: 'Mute', shape: 'text', size: 10},
        // {id: 25, label: 'safer', shape: 'text', size: 10},
        {id: 26, label: 'Arkon', shape: 'text', size: 10},
        
        // Strategy
        {id: 27, label: 'Amediateka', shape: 'text', size: 10},
        {id: 28, label: 'Okko', shape: 'text', size: 10},



    ]),
    edges: new vis.DataSet([
        {from: 3, to: 30},
        {from: 3, to: 31},
        {from: 3, to: 32},
        // {from: 1, to: 2},
        // {from: 1, to: 5},
        // {from: 3, to: 4},

        // naming


        // Добавьте другие связи между узлами
    ])
};








// menu
function toggleCategory(category) {
    // Определите, какие узлы принадлежат к каждой категории
    const categoryNodes = {
      naming: [11, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      physical: [1, 2, 3, 5], // Примерные ID узлов для физических продуктов
      identity: [4, 6, 7, 8], // Заполните ID узлов для категории Identity
      strategy: [13, 27, 28] // Заполните ID узлов для категории Strategy
    };
  
    const isChecked = document.getElementById(category).checked;
  
    // Обновите видимость узлов в зависимости от состояния чекбокса
    categoryNodes[category].forEach(nodeId => {
      var updateOptions = {id: nodeId, hidden: !isChecked};
      data.nodes.update(updateOptions);
    });

    var animationOptions = {
        scale: 1,
        animation: {
            duration: 1000,
            easingFunction: "easeInOutQuad"
        }
    };
    network.setData(data, animationOptions);
}






// отображения графа
var options = {
    interaction: {
        zoomView: false, // Отключаем возможность масштабирования
        dragView: false, // Запретить перетаскивание пустой области
        dragNodes: true // Разрешить перетаскивание узлов
    },
    physics: {
        enabled: true, // Включить физику
        stabilization: false, // Отключаем стабилизацию для постоянного движения
        barnesHut: {
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 200, // Увеличьте длину пружины для более медленной анимации
            springConstant: 0.04,
            damping: 0.09, // Небольшое значение для плавности анимации
            avoidOverlap: 0
        }
    }
};

var network = new vis.Network(container, data, options);





// case
let selectedCategoryNodes = []; // Массив для хранения узлов выбранной категории


network.on("click", function (params) {
    if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const nodeInfo = data.nodes.get(nodeId);
        const connectedNodes = network.getConnectedNodes(nodeId);

        // Скрываем все узлы, кроме выбранного и связанных с ним
        const allNodes = data.nodes.get({returnType: "Object"});
        for (let id in allNodes) {
            allNodes[id].hidden = !(id === nodeId.toString() || connectedNodes.includes(parseInt(id)));
        }
        data.nodes.update(Object.values(allNodes));

        // Приближаем к узлу
        network.focus(nodeId, {
            scale: 4,
            animation: { duration: 1000, easingFunction: "easeInOutQuad" }
        });

        // Отображаем информацию о проекте, включая описание
        document.getElementById('projectInfo').innerHTML = '</h2><p>' + (nodeInfo.description || 'Описание отсутствует.') + '</p>';
        document.getElementById('projectInfo').style.display = 'block';
    } else {
        // Возвращаем отображение всех узлов
        const allNodes = data.nodes.get({returnType: "Object"});
        for (let id in allNodes) {
            allNodes[id].hidden = selectedCategoryNodes.length > 0 && !selectedCategoryNodes.includes(parseInt(id));
        }
        data.nodes.update(Object.values(allNodes));

        network.fit({ animation: { duration: 1000, easingFunction: "easeInOutQuad" } });
        document.getElementById('projectInfo').style.display = 'none';
    }
});






