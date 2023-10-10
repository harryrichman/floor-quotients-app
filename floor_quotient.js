
function getFloorQuotientHasseGraph(n_val, a=1) {
    var hasse_graph = { nodes: [], edges: [] };
    // add nodes
    var divs = [];
    var dduals = [];
    for (i = 1; i <= n_val; i++) {
        r = n_val % i;
        d = (n_val - r) / i;
        if (Math.floor(n_val / (i + 1)) >= d) {
            continue;
        }
        dduals.push(i);
        if (a * n_val / i < a * d + 1) {
            divs.push(d);
            const node = {
                id: d, 
                label: String(d)
            };
            if (i == 1) {
                // node.fixed = true;
            }
            hasse_graph.nodes.push(node);
        }
    }
    console.log("divs: " + divs);
    console.log("dduals: " + dduals);
    // var primes = [];
    // for (p = 2; p <= n_val; p++) {
    //     var isPrime = true;
    //     for (i = 0; i < primes.length; i++) {
    //         if (p % primes[i] == 0) {isPrime = false}
    //     };
    //     if (isPrime) primes.push(p);
    // }
    // console.log("primes computed: " + primes);
    // add links
    adj_list = {};
    for (j = 0; j < divs.length; j++) {
        const n_loop = divs[divs.length - 1 - j];
        adj_list[n_loop] = [];
        var grandchildren = [];
        for (i = 0; i < dduals.length; i++) {
            const k = dduals[i];
            if (k == 1 || k > n_loop) {
                continue;
            }
            const d_loop = Math.floor(n_loop / k);
            if (Math.floor(n_loop / (k + 1)) >= d_loop) {
                continue;
            }
            var addEdge = false;
            if (n_loop == 3 && k == 3) {
                addEdge = true;
            } else if (a * n_loop / k < a * d_loop + 1) {
                addEdge = true;
                // add children of d_loop to grandchildren
                grandchildren = grandchildren.concat(adj_list[d_loop])
                // console.log("current gchildren of " + n_loop + ": " + grandchildren)
            }
            if (grandchildren.includes(d_loop)) {
                addEdge = false;
            }
            if (addEdge) {
                adj_list[n_loop].push(d_loop);
                const edge = { 
                    from: n_loop, 
                    to: d_loop,
                    id: String(d_loop) + " \u22D6 " + String(n_loop),
                    // label: String(d2) + " < " + String(d1)
                };
                hasse_graph.edges.push(edge)
            }
        }
    }
    console.log(adj_list);
    return hasse_graph;
}

/**
 * @param path
 * @param success
 * @param error
 */
function loadJSON(path, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        } else {
          error(xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }