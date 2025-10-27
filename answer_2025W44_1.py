import sys

def main():
    data = sys.stdin.read().split()
    idx = 0
    N = int(data[idx]); idx += 1
    M = int(data[idx]); idx += 1
    
    combinations = []
    for _ in range(M):
        k = int(data[idx]); idx += 1
        mask = 0
        for __ in range(k):
            fruit = int(data[idx]); idx += 1
            mask |= (1 << (fruit - 1))
        combinations.append(mask)
    
    min_size = N
    
    for bitmask in range(1, 1 << N):
        valid = True
        for comb in combinations:
            if (bitmask & comb) == 0:
                valid = False
                break
        
        if valid:
            size = bin(bitmask).count('1')
            if size < min_size:
                min_size = size
    
    print(min_size)

if __name__ == "__main__":
    main()