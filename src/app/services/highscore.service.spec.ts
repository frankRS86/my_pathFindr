import { HighscoreService }   from './highscore.service';
import {Entry} from './highscore.service';
import {TileModel} from '../views/tile.component';
import {Game} from './game.service';



describe("highscore.service.test",function(){

 let testee:HighscoreService;
 let refEntry:Entry;

  beforeEach(() => 
  {
        testee = new HighscoreService();

        let g:Game=
        {
            state:"doesnt matter for test",
            level:5,
            result:50,
            rows:undefined

        }
        refEntry = new Entry("joan doe",g);
  });
    
  it('Entry equals invalid other', () => 
  {
    let e:Entry = new Entry("joan",undefined);
    let result:number = e.equals(undefined);
    expect(result).toBe(-1);
  });

  it('Entry lesser level and percentage than other', () => 
  {    
    let e:Entry = new Entry("joan 2",{level:6,result:10,state:"",rows:undefined});
    let result:number = refEntry.equals(e);
    expect(result).toBe(1);
  });

    it('Entry lesser level but higher percentage than other', () => 
  {    
    let e:Entry = new Entry("joan 2",{level:6,result:100,state:"",rows:undefined});
    let result:number = refEntry.equals(e);
    expect(result).toBe(1);
  });

      it('Entry higher level and percentage than other', () => 
  {    
    let e:Entry = new Entry("joan 2",{level:3,result:10,state:"",rows:undefined});
    let result:number = refEntry.equals(e);
    expect(result).toBe(-1);
  });

  it('Entry higher level but lower percentage than other', () => 
  {    
    let e:Entry = new Entry("joan 2",{level:3,result:100,state:"",rows:undefined});
    let result:number = refEntry.equals(e);
    expect(result).toBe(-1);
  });

    it('Entry same level but lower percentage than other', () => 
  {    
    let e:Entry = new Entry("joan 2",{level:5,result:100,state:"",rows:undefined});
    let result:number = refEntry.equals(e);
    expect(result).toBe(1);
  });

 it('Entry same level but higher percentage than other', () => 
  {    
    let e:Entry = new Entry("joan 2",{level:5,result:10,state:"",rows:undefined});
    let result:number = refEntry.equals(e);
    expect(result).toBe(-1);
  });

   it('Entry same level and same percentage than other', () => 
  {    
    let e:Entry = new Entry("joan 2",{level:5,result:50,state:"",rows:undefined});
    let result:number = refEntry.equals(e);
    expect(result).toBe(0);
  });

     it('Highscore save undefined', () => 
  {    
    let result:boolean = testee.save(undefined, undefined);
    expect(result).toBe(false,"valid name should be neccessary");
  });

   it('Highscore save name with length 0', () => 
  {    
    let result:boolean = testee.save("", undefined);
    expect(result).toBe(false,"valid name should be neccessary");
  });

 it('Highscore save without result', () => 
  {    
    let result:boolean = testee.save("testname", undefined);
    expect(result).toBe(false,"valid name result is neccessary");
  });

   it('Highscore save with invalid result.level', () => 
  {    
    let result:boolean = testee.save("testname", {level:-1,result:50,state:"",rows:undefined});
    expect(result).toBe(false,"valid result is neccessary");
  });

 it('Highscore save with invalid result.result', () => 
  {    
    let result:boolean = testee.save("testname", {level:1,result:110,state:"",rows:undefined});
    expect(result).toBe(false,"valid result is neccessary");
  });

   it('Highscore save with invalid result.result', () => 
  {    
    let result:boolean = testee.save("testname", {level:1,result:-1,state:"",rows:undefined});
    expect(result).toBe(false,"valid result is neccessary");
  });

     it('Highscore save and emitted with valid data', () => 
  {   
    let result:boolean = testee.save("testname", {level:1,result:10,state:"",rows:undefined});
    
    testee.getCurrentHighscores().subscribe((e:Entry[]) => 
    {
        expect(e.length).toBe(1,"valid result is neccessary");
    });

    expect(result).toBe(true,"valid result is neccessary");
  });

});