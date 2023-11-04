(()=>{
    const a2m = (array, h, w) => {

        let matrix = [];
    
        for(let y = 0; y < h; y++){
    
            let row = array.slice(
                y * w * 4,
                (y + 1) * w * 4
            );
    
            let convertedRow = [];
    
            for(let step = 0; step < row.length; step += 4){
                convertedRow.push([
                    row[step],
                    row[step + 1],
                    row[step + 2],
                    row[step + 3]
                ])
            }
    
            matrix.push(
                convertedRow
            )
        }
    
        return matrix
    
    }
    
    const m2a = (matrix) => {
    
        let array = [];
    
        for(let y = 0; y < matrix.length; y++){
            for(let x = 0; x < matrix[y].length; x++){
    
                if(matrix[y][x] > 0){
                    console.log(x, y, matrix[y][x]);
                }
    
                array.push(...matrix[y][x]);
    
            }
        }
    
        return new Uint8ClampedArray(array);
    
    }
    
    
    
    
    const solve = () => {
    
        var c = document.querySelector(`.geetest_canvas_bg`);
        var ctx = c.getContext("2d");
    
        var w = c.width;
        var h = c.height;
    
        var pixels = ctx.getImageData(0, 0, w, h).data;
    
        var matrix = a2m(pixels, h, w);
    
        var deltaMatrix = [];
    
    
        for(let y = 0; y < matrix.length; y++){
    
            let row = matrix[y];
    
            deltaMatrix[y] = new Array(row.length);
    
            // first pixel will be empty
            deltaMatrix[y][0] = [0,0,0,0];
    
            for(let x = 1; x < row.length; x++){
    
                let p0 = row[x -1]; // previous pixel
                let p1 = row[x];    // current pixel
    
                // create new pixel, that has the color that is the difference between the other pixels
    
                /*
                let p2 = [
                    255 - Math.abs(p0[0] - p1[0]),
                    255 - Math.abs(p0[1] - p1[1]),
                    255 - Math.abs(p0[2] - p1[2]),
                    255 //Math.abs(p0[3] - p1[3]) // ignore alpha, keep full
                ];
                */
    
                // gray scale:
    
                let baw = true; // turn black and white?
                
                let avg = (Math.abs(p0[0] - p1[0]) + Math.abs(p0[1] - p1[1]) + Math.abs(p0[2] - p1[2])) / 3;
    
                    // noise filter
                let minLevel = 70;
                if(avg < minLevel){
                    avg = 0;
                }else if(baw){
                    avg = 255;
                }
    
                let p2 = [
                    255 - avg,
                    255 - avg,
                    255 - avg,
                    255
                ];
                // end gray
    
                deltaMatrix[y][x] = p2;
    
            }
    
        }
    
        console.log(deltaMatrix);
    
        var streaks = [];
    
        function pixelIsWhite(p){
            return p[0] + p[1] + p[2] === 255 * 3
        }
    
        for(let y = 1; y < h; y++){
            for(let x = 0; x < w; x++){
    
                let p0 = deltaMatrix[y - 1][x];
                let p1 = deltaMatrix[y][x];
    
                if(pixelIsWhite(p1)){
                    continue;
                }
    
                if(pixelIsWhite(p0)){
                    deltaMatrix[y][x] = [255,0,0,255];
                }
    
                for(let streak = 0; true; streak++){
    
                    let y2 = y + streak; // the y-coordinate to test
    
                    // check if pixel is out of bounds
                    if(!deltaMatrix[y2]){break;}
    
                    if(pixelIsWhite(deltaMatrix[y2][x])){ // end streak
                        deltaMatrix[y2 - 1][x] = [0,0,255,255];
    
                        streaks.push({
                            length: streak,
                            x: x,
                            y: y
                        });
    
                        break;
                    }else{
                        //deltaMatrix[y2 - 1][x] = [0,255,0,255];
                    }
    
                }
    
            }
        }
    
        // sort streaks by length high -> low
        streaks = streaks.sort((a,b)=>{
            return b.length - a.length
        });
    
        console.log(streaks);
    
    
        var newImageData = m2a(deltaMatrix);
    
        console.log('newImageData', newImageData);
    
        // replace original canvas

        ctx.putImageData(
            new ImageData(
                newImageData,
                w, h
            ),
            0,
            0
        );
    

        // mark col of highest streak
        let s = streaks[0];
    
        ctx.strokeStyle = "#0f0";
        ctx.lineWidth = 1;
    
        ctx.beginPath();
        ctx.moveTo(s.x, 0);
        ctx.lineTo(s.x, h);
        ctx.stroke();
    
    
        // the actual move input should be offset by around 5px from the x coordinate of the streak
    
        alert(`The slider should be offset ${s.x - 5}px!`)
    
    }
    
    solve();
})()