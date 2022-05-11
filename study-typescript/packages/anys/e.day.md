

```typescript
    type ProType<C> = {
        c: new (p: number) => C;
        time: number
    }
    // new Pro1<ProType>({})
    let bbs: ProType<Pro1> = {
        time: 123,
        c: Pro1
    }
    new bbs.c(888)
```